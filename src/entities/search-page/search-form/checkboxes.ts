type Checkboxes = {
	name:
		| "maxFullness"
		| "inBusinessNews"
		| "onlyMainRole"
		| "onlyWithRiskFactors"
		| "includeTechNews"
		| "includeAnnouncements"
		| "includeDigests";
	label: string;
}[];

export const checkboxes: Checkboxes = [
	{
		name: "maxFullness",
		label: "Признак максимальной полноты",
	},
	{
		name: "inBusinessNews",
		label: "Упоминания в бизнес-контексте",
	},
	{
		name: "onlyMainRole",
		label: "Главная роль в публикации",
	},
	{
		name: "onlyWithRiskFactors",
		label: "Публикации только с риск-факторами",
	},
	{
		name: "includeTechNews",
		label: "Включать технические новости рынков",
	},
	{
		name: "includeAnnouncements",
		label: "Включать анонсы и календари",
	},
	{
		name: "includeDigests",
		label: "Включать сводки новостей",
	},
];
