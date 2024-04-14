"use client";
import dayjs from "dayjs";
import { isInn } from "@/shared/helpers/form";
import {
	Form,
	Input,
	Select,
	Checkbox,
	Button,
	Datepicker,
	InputInn,
} from "@/shared/ui";

import { isNotEmpty, useForm } from "@mantine/form";

import s from "./SearchForm.module.css";

type Checkboxes = {
	value: boolean;
	name: "full" | "biz" | "main" | "risk" | "tech" | "calendar" | "news";
	label: string;
}[];

const checkboxes: Checkboxes = [
	{ value: true, name: "full", label: "Признак максимальной полноты" },
	{ value: true, name: "biz", label: "Упоминания в бизнес-контексте" },
	{ value: true, name: "main", label: "Главная роль в публикации" },
	{ value: false, name: "risk", label: "Публикации только с риск-факторами" },
	{ value: false, name: "tech", label: "Включать технические новости рынков" },
	{ value: true, name: "calendar", label: "Включать анонсы и календари" },
	{ value: false, name: "news", label: "Включать сводки новостей" },
];

export const SearchForm = () => {
	const form = useForm({
		initialValues: {
			inn: "",
			tone: "",
			docn: "",
			dateFrom: "",
			dateTo: "",
			full: true,
			biz: true,
			main: true,
			risk: false,
			tech: false,
			calendar: true,
			news: false,
		},
		validate: {
			inn: (value) => {
				const preparedValue = value.replace(/\s/g, "");
				return isInn(preparedValue) && preparedValue
					? null
					: "Некорректные данные";
			},
			docn: isNotEmpty("Заполните поле"),
		},
	});

	return (
		<Form
			onSubmit={form.onSubmit((values) => {
				const valuesToSearch = {
					...values,
					dateFrom: dayjs(values.dateFrom).format("DD.MM.YYYY"),
					dateTo: dayjs(values.dateTo).format("DD.MM.YYYY"),
				};
				console.log(valuesToSearch);
			})}
			className={s.form}
		>
			<div className={s.mainFields}>
				<InputInn className={s.shortInput} {...form.getInputProps("inn")} />
				<Select
					className={s.shortInput}
					placeholder="Любая"
					data={[
						{ label: "Не проверяется", value: "any" },
						{ label: "Негативная", value: "negative" },
						{ label: "Позитивная", value: "positive" },
					]}
					label="Тональность"
					{...form.getInputProps("tone")}
				/>
				<Input
					className={s.shortInput}
					placeholder="1"
					type=""
					label="Количество документов в выдаче"
					withAsterisk
					{...form.getInputProps("docn")}
				/>

				<div className={s.dates}>
					<Datepicker
						placeholder="Дата начала"
						withAsterisk={true}
						label="Диапазон поиска"
						{...form.getInputProps("dateFrom")}
					/>

					<Datepicker
						placeholder="Дата конца"
						{...form.getInputProps("dateTo")}
						label="&nbsp;"
					/>
				</div>
			</div>
			<div className={s.checkboxes}>
				{checkboxes.map((checkbox) => {
					return (
						<Checkbox
							key={checkbox.name}
							defaultChecked={form.values[checkbox.name]}
							label={checkbox.label}
							{...form.getInputProps(checkbox.name)}
						/>
					);
				})}
			</div>
			<div className={s.submit}>
				<Button style={{ width: "100%" }}>Поиск</Button>
				<div className={s.buttonNote}>* Обязательные к заполнению поля</div>
			</div>
		</Form>
	);
};
