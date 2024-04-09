import Image from "next/image";
import { SearchForm } from "@/entities/search/search-form/SearchForm";
import s from "./page.module.css";

export default function SearchPage() {
	return (
		<div className={s.container}>
			<div className={s.title}>Найдите необходимые данные в пару кликов.</div>
			<div className={s.subTitle}>
				Задайте параметры поиска. Чем больше заполните, тем точнее поиск
			</div>

			<SearchForm />

			<div className={s.image}>
				<Image
					src="/images/search/man-with-rocket.svg"
					width={442}
					height={470}
					alt="man-with-rocket"
				/>
				<Image
					src="/images/search/folders.svg"
					width={140}
					height={68}
					alt="folders"
				/>
				<Image src="/images/search/doc.svg" width={91} height={111} alt="doc" />
			</div>
		</div>
	);
}
