import { ComponentProps } from "react";
import clsx from "clsx";
import s from "./Card.module.css";

type CardProps = ComponentProps<"div">;

export const Card = (props: CardProps) => {
	const { children, className = "", ...divProps } = props;
	return <div className={clsx(s.card, className)}>{children}</div>;
};
