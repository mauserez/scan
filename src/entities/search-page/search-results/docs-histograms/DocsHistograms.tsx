import { plural } from "@/shared/helpers/number";
import { GetSearchDataResult } from "../../search-params/search-form/api/getSearchData";
import { HistogramsCarousel } from "./ui/carousel/HistogramsCarousel";
import { IoIosRefresh } from "react-icons/io";
import { SearchPageContext } from "../../SearchPageContext";

import s from "./DocsHistograms.module.css";
import { useContext } from "react";

type SearchHistogramsProps = {
	docLength: number | undefined;
	histograms: GetSearchDataResult["histograms"] | undefined;
};

export const DocsHistograms = (props: SearchHistogramsProps) => {
	const { docLength = 0, histograms } = props;
	const { setResult } = useContext(SearchPageContext);

	return (
		<div className={s.scrollerSection}>
			<div>
				<div className={s.subTitle}>
					Общая сводка
					<span
						className={s.repeatSearch}
						onClick={() => {
							setResult(null);
						}}
					>
						<IoIosRefresh />
						Изменить параметры поиска
					</span>
				</div>
				<div className={s.subTitleNote}>
					Найдено {docLength}{" "}
					{plural(["вариант", "варианта", "вариантов"], docLength)}
				</div>
			</div>
			<HistogramsCarousel histograms={histograms} />
		</div>
	);
};
