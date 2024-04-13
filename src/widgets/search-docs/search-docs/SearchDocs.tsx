"use client";

import { SearchForm } from "@/entities/search-docs/search-form/SearchForm";
import Image from "next/image";
import s from "./SearchDocs.module.css";
import { useSessionUser } from "@/shared/session/clientHooks";

export const SearchDocs = () => {
	//const user = useSessionUser();

	return (
		<div className={s.container}>
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
						<Image src="/images/search/doc.svg" fill alt="doc" />
					</div>
					<SearchForm />
				</div>
			</div>

			<div className={s.foldersImage}>
				<Image src="/images/search/folders.svg" fill alt="folders" />
			</div>

			<div className={s.image}>
				<Image
					src="/images/search/man-with-rocket.svg"
					width={442}
					height={470}
					alt="man-with-rocket"
				/>
			</div>
		</div>
	);
};
