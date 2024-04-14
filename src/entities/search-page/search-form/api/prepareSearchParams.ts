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
