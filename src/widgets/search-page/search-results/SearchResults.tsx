import { useContext, useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

import { SearchPageContext } from "@/app/search/page";
import { Button } from "@/shared/ui";
import { plural } from "@/shared/helpers/number";
import { mainApi } from "@/shared/axios/mainApi";

import { DocCard } from "@/entities/search-page";
import clsx from "clsx";
import s from "./SearchResults.module.css";

export type Doc = {
	ok: {
		dedupClusterId: string;
		attributes: {
			wordCount: number;
			isTechNews: boolean;
			isAnnouncement: boolean;
			isDigest: true;
		};
		content: {
			markup: string;
		};
		source: {
			name: string;
		};
		title: {
			text: string;
		};
		issueDate: string;
		url: string;
	};
};

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
	const isFirstRender = useRef(true);

	const addDocs = useCallback(async () => {
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

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			addDocs();
		}
	}, [addDocs]);

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
			<div className={s.scrollerSection}>
				<div>
					<div className={s.subTitle}>Общая сводка</div>
					<div className={s.subTitleNote}>
						Найдено {docIds?.length}{" "}
						{plural(["вариант", "варианта", "вариантов"], docIds?.length || 0)}
					</div>
				</div>
				<div className={s.scroller}>
					<div className={s.scrollerTitle}>
						<div>Период</div>
						<div>Всего</div>
						<div>Риски</div>
					</div>
					<div className={s.scrollerBody}>
						{histograms?.map((item) => (
							<div key={item.date} className={s.scrollerBodyItem}>
								<div>{item.date}</div>
								<div>{item.value}</div>
								<div>{item.riskValue}</div>
							</div>
						))}
					</div>
				</div>
			</div>

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
							addDocs();
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
