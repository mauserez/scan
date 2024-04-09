"use client";

import dayjs from "dayjs";
import { InputBase } from "@mantine/core";
import { Form, Input, Select, Checkbox, Button, Datepicker } from "@/shared/ui";
import { isNotEmpty, useForm } from "@mantine/form";
import { useMask } from "@react-input/mask";

import inputStyle from "../../../shared/ui/input/Input.module.css";
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
	const inputRef = useMask({
		mask: "__ ___ ___ __ __",
		replacement: { _: /\d/ },
	});

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
				return /^[0-9]{10,12}$/.test(preparedValue) && preparedValue
					? null
					: "Некорректные данные";
			},
			docn: isNotEmpty("Заполните поле"),
			/* dateFrom: (value) => {
				console.log(value);
				console.log(form.values.dateTo);
			}, */
		},
	});

	//const inputValue = dayjs(value).format("DD.MM.YYYY");

	return (
		<Form
			onSubmit={form.onSubmit((values) => {
				console.log(values);

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
				<InputBase
					style={{ width: "242px" }}
					className={inputStyle.input}
					ref={inputRef}
					label="ИНН компании"
					withAsterisk
					{...form.getInputProps("inn")}
				/>
				<Select
					width={"242px"}
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
					className={s.input}
					width={"242px"}
					placeholder="1"
					type=""
					label="Количество документов в выдаче"
					withAsterisk
					{...form.getInputProps("docn")}
				/>

				<div className={s.dates}>
					<Datepicker
						withAsterisk={true}
						label="Диапазон поиска"
						{...form.getInputProps("dateFrom")}
					/>

					<Datepicker {...form.getInputProps("dateTo")} label="&nbsp;" />
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
			<Button className={s.submit}>Save</Button>
		</Form>
	);
};
