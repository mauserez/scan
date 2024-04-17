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

	const { ok } = props;
	const { title, source, content, attributes, issueDate, url } = ok;

	const { name: companyName } = source;
	const { wordCount } = attributes;
	const nodes = parseXmlContent(content.markup);

	useEffect(() => {
		if (ref.current) {
			nodes.forEach((child) => {
				ref.current?.append(child);
			});
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

				<div className={s.docImage}></div>
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

	return document.body.childNodes;
};
