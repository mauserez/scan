import { mainApi } from "@/shared/axios/mainApi";
import dayjs from "dayjs";

type HistogramType = "totalDocuments" | "riskFactors";

type HistogramDataType = {
	data: { value: number; date: string }[];
	histogramType: HistogramType;
};

type GetHistogramsResultType = { data: HistogramDataType[] };

type DocId = {
	encodedId: string;
	influence: number;
	similarCount: number;
};

type GetDocIdsResultType = {
	items: DocId[];
	mappings: [{ inn: string; entityIds: number[] }];
};

export type GetSearchDataResult = {
	histograms: {
		riskValue: number;
		date: string;
		value: number;
	}[];
	docIds: string[];
};

export const getSearchData = async (props: SearchProps) => {
	const body = prepareSearchParams(props);

	const histogramsPromise = mainApi
		.post<GetHistogramsResultType>("/objectsearch/histograms", body)
		.then((res) => {
			return res.data.data;
		});

	const docIdsPromise = mainApi
		.post<GetDocIdsResultType>("/objectsearch", body)
		.then((res) => {
			return res.data;
		});

	const [histogramsResult, docIdsResult] = await Promise.all([
		histogramsPromise,
		docIdsPromise,
	]);

	if (!Array.isArray(histogramsResult)) {
		return { histograms: [], docIds: [] };
	}
	const histograms = prepareHistogramsData(histogramsResult);

	return {
		histograms: histograms,
		docIds: docIdsResult.items.map((item) => item.encodedId),
	};
};

const prepareHistogramsData = (data: HistogramDataType[]) => {
	const preparedHistograms = data.map((item) => {
		item.data.sort((a, b) => {
			return dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1;
		});

		const items = item.data.map((dayItem) => {
			return { ...dayItem, date: dayjs(dayItem.date).format("DD.MM.YYYY") };
		});

		return { ...item, data: items };
	});

	const totalDocuments = preparedHistograms.find(
		(data) => data.histogramType === "totalDocuments"
	);

	const riskFactors = preparedHistograms.find(
		(data) => data.histogramType === "riskFactors"
	);

	const histograms =
		totalDocuments?.data.map((item, idx) => {
			return { ...item, riskValue: riskFactors?.data[idx].value || 0 };
		}) || [];

	return histograms;
};

export type SearchProps = {
	inn: string;
	tonality: string;
	limit: string;
	from: string;
	to: string;
	maxFullness: boolean;
	inBusinessNews: boolean;
	onlyMainRole: boolean;
	onlyWithRiskFactors: boolean;
	includeTechNews: boolean;
	includeAnnouncements: boolean;
	includeDigests: boolean;
};

export const prepareSearchParams = (props: SearchProps) => {
	const {
		from,
		to,
		inn,
		tonality,
		limit,
		maxFullness,
		inBusinessNews,
		onlyMainRole,
		onlyWithRiskFactors,
		includeTechNews,
		includeAnnouncements,
		includeDigests,
	} = props;

	const params = {
		"issueDateInterval": {
			//Диапазон поиска 2024-04-01T00:00:00+03:00
			"startDate": from,
			"endDate": to,
		},
		"searchContext": {
			"targetSearchEntitiesContext": {
				"targetSearchEntities": [
					{
						"type": "company",
						"sparkId": null,
						"entityId": null,
						//Инн компании 7710137066
						"inn": inn,
						//Признак максимальной полноты
						"maxFullness": maxFullness,
						//Упоминания в бизнес-контексте null or boolean
						"inBusinessNews": inBusinessNews,
					},
				],
				//Главная роль в публикации
				"onlyMainRole": onlyMainRole,
				//Тональность
				"tonality": tonality,
				//Публикации только с риск-факторами
				"onlyWithRiskFactors": onlyWithRiskFactors,
				"riskFactors": {
					"and": [],
					"or": [],
					"not": [],
				},
				"themes": {
					"and": [],
					"or": [],
					"not": [],
				},
			},
			"themesFilter": {
				"and": [],
				"or": [],
				"not": [],
			},
		},
		"searchArea": {
			"includedSources": [],
			"excludedSources": [],
			"includedSourceGroups": [],
			"excludedSourceGroups": [],
		},
		"attributeFilters": {
			//Включать технические новости рынков
			"excludeTechNews": !includeTechNews,
			//Включать анонсы и календари
			"excludeAnnouncements": !includeAnnouncements,
			//Включать сводки новостей
			"excludeDigests": !includeDigests,
		},
		//Количество документов в выдаче
		"limit": limit,
		"similarMode": "duplicates",
		"sortType": "issueDate",
		"sortDirectionType": "desc",
		"intervalType": "day",
		"histogramTypes": ["totalDocuments", "riskFactors"],
	};

	return params;
};
