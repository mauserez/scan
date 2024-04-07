"use client";

import { useMediaQuery } from "@/shared/hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "./swiper.css";

import { Card } from "@/shared/ui";
import clsx from "clsx";
import s from "./Carousel.module.css";
import { CarouselCard } from "../carousel-card/CarouselCard";

export const Carousel = () => {
	const is500 = useMediaQuery("(max-width: 800px)");
	const is1300 = useMediaQuery("(max-width: 1299px)");

	let slidesPerView = 3;

	if (is1300) {
		slidesPerView = 2;
	}

	if (is500) {
		slidesPerView = 1;
	}

	return (
		<Swiper
			cssMode={true}
			slidesPerView={slidesPerView}
			spaceBetween={0}
			navigation={true}
			loop={true}
			/* autoplay={{
				delay: 3000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			}} */
			modules={[Navigation, Autoplay]}
			className={clsx(s.slider, "fadeIn")}
		>
			{cardsInfo.map((card) => (
				<SwiperSlide key={Math.random() + card.src} className={s.slide}>
					<Card className={s.card}>
						<CarouselCard text={card.text} src={card.src} />
					</Card>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

const cardsInfo = [
	{
		src: "/images/card-icons/clock.svg",
		text: (
			<span>
				Высокая и оперативная скорость
				<br /> обработки заявки
			</span>
		),
	},
	{
		src: "/images/card-icons/magny.svg",
		text: (
			<span>
				Огромная комплексная база
				<br /> данных, обеспечивающая
				<br /> объективный ответ на запрос
			</span>
		),
	},
	{
		src: "/images/card-icons/guard.svg",
		text: (
			<span>
				Защита конфеденциальных сведений,
				<br /> не подлежащих разглашению по
				<br /> федеральному законодательству
			</span>
		),
	},
	{
		src: "/images/card-icons/clock.svg",
		text: (
			<span>
				Высокая и оперативная скорость
				<br /> обработки заявки
			</span>
		),
	},
	{
		src: "/images/card-icons/magny.svg",
		text: (
			<span>
				Огромная комплексная база
				<br /> данных, обеспечивающая
				<br /> объективный ответ на запрос
			</span>
		),
	},
	{
		src: "/images/card-icons/guard.svg",
		text: (
			<span>
				Защита конфеденциальных сведений,
				<br /> не подлежащих разглашению по
				<br /> федеральному законодательству
			</span>
		),
	},
];
