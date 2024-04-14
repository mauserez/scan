"use client";

import dayjs from "dayjs";
import { isInn } from "@/shared/helpers/form";
import { useContext } from "react";

import {
	Form,
	Input,
	Select,
	Checkbox,
	Button,
	Datepicker,
	InputInn,
} from "@/shared/ui";

import { useForm } from "@mantine/form";

import { isNumber } from "@/shared/helpers/number";
import { checkboxes } from "./checkboxes";
import { getSearchData } from "./api/getSearchData";
import { SearchPageContext } from "@/app/search/page";

import s from "./SearchForm.module.css";

export const SearchForm = () => {
	const { setResult } = useContext(SearchPageContext);

	const today = new Date();
	const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

	const form = useForm({
		initialValues: {
			inn: "77 101 370 66",
			tonality: "any",
			limit: "1000",
			from: monthStart,
			to: today,
			maxFullness: true,
			inBusinessNews: true,
			onlyMainRole: true,
			onlyWithRiskFactors: false,
			includeTechNews: false,
			includeAnnouncements: true,
			includeDigests: false,
		},
		validate: {
			inn: (value) => {
				const preparedValue = value.replace(/\s/g, "");
				return isInn(preparedValue) && preparedValue
					? null
					: "Некорректные данные";
			},
			limit: (value) => {
				const preparedValue = Number(value.trim());

				return !isNumber(preparedValue) ||
					!preparedValue ||
					preparedValue > 1000
					? "Число от 1 до 1000"
					: null;
			},
		},
	});

	return (
		<Form
			onSubmit={form.onSubmit(async (values) => {
				const valuesToSearch = {
					...values,
					inn: values.inn.replace(/\s/g, ""),
					from: dayjs(values.from).format("YYYY-MM-DDT00:00:00Z"),
					to: dayjs(values.to).format("YYYY-MM-DDT23:59:59Z"),
				};

				const result = await getSearchData(valuesToSearch);
				setResult(result);
			})}
			className={s.form}
		>
			<div className={s.mainFields}>
				<InputInn
					placeholder="ИНН 10 или 12 цифр"
					className={s.shortInput}
					{...form.getInputProps("inn")}
				/>
				<Select
					className={s.shortInput}
					placeholder="Любая"
					data={[
						{ label: "Любая", value: "any" },
						{ label: "Негативная", value: "negative" },
						{ label: "Позитивная", value: "positive" },
					]}
					label="Тональность"
					{...form.getInputProps("tonality")}
				/>
				<Input
					className={s.shortInput}
					placeholder="Введите от 1 до 1000"
					type=""
					label="Количество документов в выдаче"
					withAsterisk
					maxLength={4}
					{...form.getInputProps("limit")}
				/>

				<div className={s.dates}>
					<Datepicker
						placeholder="Дата начала"
						withAsterisk={true}
						label="Диапазон поиска"
						{...form.getInputProps("from")}
					/>

					<Datepicker
						placeholder="Дата конца"
						{...form.getInputProps("to")}
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
