import { ReactNode } from "react";
import clsx from "clsx";
import s from "./Article.module.css";

type ArticleProps = {
	title: ReactNode;
	children: ReactNode;
	titleClassName?: string;
	contentClassName?: string;
};
export const Article = (props: ArticleProps) => {
	const { title, children, contentClassName = "", titleClassName = "" } = props;

	return (
		<section className={s.article}>
			<div className={clsx(s.articleTitle, titleClassName)}>{title}</div>
			<div className={clsx(s.articleBody, contentClassName)}>{children}</div>
		</section>
	);
};
