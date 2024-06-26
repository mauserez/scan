"use client";

import { SearchForm } from "@/entities/search-page/search-params";
import Image from "next/image";
import s from "./SearchParams.module.css";
import clsx from "clsx";

export const SearchParams = () => {
	return (
		<div className={clsx(s.container, "fade-in")}>
			<div>
				<div className={s.titleSection}>
					<div className={s.title}>
						Найдите необходимые данные в пару кликов.
					</div>
					<div className={s.subTitle}>
						Задайте параметры поиска. Чем больше заполните, тем точнее поиск
					</div>
				</div>

				<div className={s.form}>
					<div className={s.docImage}>
						<Image priority src="/images/search/doc.svg" fill alt="doc" />
					</div>
					<SearchForm />
				</div>
			</div>

			<div className={s.foldersImage}>
				<Image src="/images/search/folders.svg" fill alt="folders" />
			</div>

			<div className={s.image}>
				<Image
					priority
					src="/images/search/man-with-rocket.svg"
					width={442}
					height={470}
					alt="man-with-rocket"
				/>
			</div>
		</div>
	);
};
