"use client";

import { useMediaQuery } from "@/shared/hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { GetSearchDataResult } from "../../../../search-params/search-form/api/getSearchData";

import "swiper/css";
import "swiper/css/navigation";

import clsx from "clsx";
import s from "./HistogramsCarousel.module.css";

type HistogramsCarouselProps = {
	histograms: GetSearchDataResult["histograms"] | undefined;
};
export const HistogramsCarousel = (props: HistogramsCarouselProps) => {
	const { histograms } = props;

	const is500 = useMediaQuery("(max-width: 800px)");
	const is1300 = useMediaQuery("(max-width: 1299px)");
	const slideLen = histograms?.length || 0;

	let slidesPerView = slideLen < 6 ? slideLen : 6;

	if (is1300) {
		slidesPerView = 3;
	}

	if (is500) {
		slidesPerView = 1;
	}

	return (
		<div className={s.container}>
			<div className={s.title}>
				<div>Период</div>
				<div>Всего</div>
				<div>Риски</div>
			</div>
			<Swiper
				cssMode={true}
				slidesPerView={slidesPerView}
				spaceBetween={0}
				navigation={true}
				loop={true}
				modules={[Navigation]}
				className={clsx(s.slider, "fade-in-carousel")}
			>
				{histograms?.map((item) => (
					<SwiperSlide key={Math.random()} className={s.slide}>
						<div key={item.date} className={s.slideContent}>
							<div>{item.date}</div>
							<div>{item.value}</div>
							<div>{item.riskValue}</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
