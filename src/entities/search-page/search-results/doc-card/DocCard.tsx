import dayjs from "dayjs";
import { plural } from "@/shared/helpers/number";
import { Card } from "@/shared/ui";
import { type Doc } from "@/widgets/search-page/";
import { useEffect, useRef } from "react";

import { DocCardBadges } from "..";
import s from "./DocCard.module.css";

type DocCardProps = Doc;

export const DocCard = (props: DocCardProps) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const refImage = useRef<HTMLDivElement | null>(null);

	const { ok } = props;
	const { title, source, content, attributes, issueDate, url } = ok;

	const { name: companyName } = source;
	const { wordCount } = attributes;
	const nodes = parseXmlContent(content.markup);

	useEffect(() => {
		if (ref.current) {
			nodes.textNodes.forEach((child) => {
				ref.current?.append(child);
			});
		}
		if (refImage.current) {
			refImage.current?.append(nodes.image);
		}
	}, [nodes]);

	return (
		<Card>
			<div className={s.doc}>
				<div className={s.docDate}>
					<div>{dayjs(issueDate).format("DD.MM.YYYY")}</div>
					<div className={s.docAuthor}>
						{companyName.replace(/ *\([^)]*\) */g, "")}
					</div>
				</div>
				<div title={title.text} className={s.docTitle}>
					{title.text}
				</div>

				<DocCardBadges attributes={attributes} />

				{nodes.image ? <div ref={refImage} className={s.docImage}></div> : null}
				<div className={s.docText} ref={ref}></div>
				<div className={s.docFooter}>
					<button className={s.docButton}>
						<a target="_blank" href={url}>
							Читать в источнике
						</a>
					</button>
					<div className={s.docLetterCount}>
						{wordCount} {plural(["слово", "слова", "слов"], wordCount)}
					</div>
				</div>
			</div>
		</Card>
	);
};

const parseXmlContent = (xmlString: string) => {
	const parser = new DOMParser();
	const node = new DOMParser().parseFromString(
		xmlString,
		"text/xml"
	).documentElement;

	let text = "";
	const nodes = node.querySelectorAll("*");

	nodes.forEach((value) => {
		if (value.hasChildNodes()) {
			if (value.tagName === "entity") {
				text += value.textContent;
			}
			value.childNodes.forEach((child) => {
				text += child.textContent;
			});
		} else {
			text += value.innerHTML;
		}
	});

	const document = parser.parseFromString(text, "text/html");
	const images = document.getElementsByTagName("img");

	if (images) {
		const l = images.length;
		for (let i = 0; i < l; i++) {
			if (images[0].parentNode) {
				images[0].parentNode.removeChild(images[0]);
			}
		}
	}

	const documentClone = parser.parseFromString(text, "text/html");
	const imagesClone = documentClone.getElementsByTagName("img");
	const firstImage = imagesClone[0];

	if (firstImage) {
		firstImage.onerror = () => {
			firstImage.style.display = "none";
		};
	}

	return { textNodes: document.body.childNodes, image: firstImage || null };
};
