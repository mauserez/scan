import { ComponentProps } from "react";
import clsx from "clsx";
import s from "./ArticleTitle.module.css";

type ArticleTitleProps = ComponentProps<"div">;

export const ArticleTitle = (props: ArticleTitleProps) => {
	const { className = "", children } = props;
	return <div className={clsx(s.title, className)}>{children}</div>;
};
