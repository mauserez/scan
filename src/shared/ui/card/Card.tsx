import { ReactNode } from "react";
import s from "./Card.module.css";

type CardProps = {
	children: ReactNode;
};

export const Card = (props: CardProps) => {
	const { children } = props;
	return <div className={s.card}>{children}</div>;
};
