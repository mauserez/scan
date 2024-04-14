import dayjs from "dayjs";
import { plural } from "@/shared/helpers/number";
import { Card } from "@/shared/ui";
import { Doc } from "@/widgets/search-page";
import s from "./DocCard.module.css";

type DocCardProps = Doc;

export const DocCard = (props: DocCardProps) => {
	const { ok } = props;
	const { title, source, content, attributes, dedupClusterId, issueDate } = ok;

	const { name: companyName } = source;
	const { isAnnouncement, isTechNews, isDigest, wordCount } = attributes;

	return (
		<Card>
			<div className={s.doc}>
				<div className={s.docDate}>
					<div>{dayjs(issueDate).format("DD.MM.YYYY")}</div>
					<div className={s.docAuthor}>{companyName}</div>
				</div>
				<div className={s.docTitle}>{title.text}</div>
				<div className={s.docBadge}>Технические новости</div>
				<div className={s.docImage}></div>
				<div className={s.docText}>{content.markup}</div>
				<div className={s.docFooter}>
					<button className={s.docButton}>Читать в источнике</button>
					<div className={s.docLetterCount}>
						{wordCount} {plural(["слово", "слова", "слов"], wordCount)}
					</div>
				</div>
			</div>
		</Card>
	);
};
