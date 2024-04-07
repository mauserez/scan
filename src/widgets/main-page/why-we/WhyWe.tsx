import { ArticleTitle } from "@/shared/ui";
import Image from "next/image";
import { Carousel } from "@/entities/main-page/why-we/carousel/Carousel";
import s from "./WhyWe.module.css";

export const WhyWe = () => {
	return (
		<div>
			<ArticleTitle>
				почему <br />
				именно мы
			</ArticleTitle>
			<Carousel />
			<div className={s.image}></div>
		</div>
	);
};
