import { ReactNode } from "react";
import Image from "next/image";
import s from "./CarouselCard.module.css";

type CarouselCardProps = {
	src: string;
	text: string | ReactNode;
};

export const CarouselCard = (props: CarouselCardProps) => {
	const { src, text } = props;

	return (
		<div className={s.card}>
			<div className={s.icon}>
				<Image width={64} height={64} src={src} alt="icon" />
			</div>
			<div className={s.text}>{text}</div>
		</div>
	);
};
