import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { mainApi } from "@/shared/axios/mainApi";

import Image from "next/image";
import { Button } from "@/shared/ui";

import { SearchPageContext } from "@/entities/search-page/SearchPageContext";
import { DocCard, DocsHistograms } from "@/entities/search-page/search-results";
import { type Doc } from "./types";

import clsx from "clsx";
import s from "./SearchResults.module.css";

export const SearchResults = () => {
	const { result } = useContext(SearchPageContext);
	const [cursor, setCursor] = useState(0);
	const [loading, setLoading] = useState(false);

	const histograms = result?.histograms;
	const docIds = result?.docIds;
	const docIdsLen = result?.docIds.length || 0;

	const limit = 10;
	const cursorPlusLimit = cursor + limit;

	const [docs, setDocs] = useState<Doc[]>([]);

	const addMoreDocs = useCallback(async () => {
		const sliceFrom = cursor;
		const sliceTo = docIdsLen < cursorPlusLimit ? docIdsLen : cursorPlusLimit;

		await mainApi
			.post<Doc[]>("/documents", {
				ids: docIds?.slice(sliceFrom, sliceTo),
			})
			.then((res) => {
				setCursor(sliceTo);
				setDocs((prev) => [...prev, ...res.data]);
				setLoading(false);
			});
	}, [cursor, cursorPlusLimit, docIdsLen, docIds]);

	const isFirstRender = useRef(true);
	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			addMoreDocs();
		}
	}, [addMoreDocs]);

	return (
		<div className={clsx(s.container, "fade-in")}>
			<div className={s.mainSection}>
				<div className={s.mainSectionTitle}>
					<div className={s.title}>Ищем. Скоро будут результаты</div>
					<div className={s.smallTitle}>
						Поиск может занять некоторое время,
						<br /> просим сохранять терпение.
					</div>
				</div>
				<div className={s.image}>
					<Image
						fill
						alt="girl-searching"
						src="/images/pages/search/girl.svg"
					/>
				</div>
			</div>

			<DocsHistograms histograms={histograms} docLength={docIds?.length} />

			<div className={s.docSection}>
				<div className={s.subTitle}>Список документов</div>
				<div className={s.docList}>
					{docs.map((doc, idx) => (
						<DocCard key={idx} ok={doc.ok} />
					))}
				</div>

				{docs.length < docIdsLen ? (
					<Button
						loading={loading}
						onClick={() => {
							setLoading(true);
							addMoreDocs();
						}}
						className={s.showMore}
					>
						Показать больше
					</Button>
				) : null}
			</div>
		</div>
	);
};
