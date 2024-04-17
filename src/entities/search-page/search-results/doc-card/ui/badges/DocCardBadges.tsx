import { Doc } from "@/widgets/search-page";
import s from "./DocCardBadges.module.css";

type DocCardBadgesProps = {
	attributes: Doc["ok"]["attributes"];
};

export const DocCardBadges = (props: DocCardBadgesProps) => {
	const { attributes } = props;
	const { isTechNews, isAnnouncement, isDigest } = attributes;

	return (
		<div className={s.badges}>
			{!!isTechNews ? <div className={s.badge}>Технические новости</div> : null}

			{!!isAnnouncement ? (
				<div className={s.badge}>Анонсы и события</div>
			) : null}

			{!!isDigest ? <div className={s.badge}>Сводки новостей</div> : null}
		</div>
	);
};
