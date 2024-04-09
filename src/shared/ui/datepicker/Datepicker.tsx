"use client";

import "dayjs/locale/ru";
import { LegacyRef } from "react";
import { DateInput, DateInputProps, DatesProvider } from "@mantine/dates";

import clsx from "clsx";
import s from "./DatePicker.module.css";

type DatepickerProps = DateInputProps & { ref?: LegacyRef<HTMLInputElement> };

export const Datepicker = (props: DatepickerProps) => {
	const { className = "", ...otherDatepickerProps } = props;

	return (
		<DatesProvider settings={{ locale: "ru" }}>
			<DateInput
				onChange={(value) => {
					if (value) {
					}
				}}
				className={clsx(s.datepicker, className)}
				valueFormat="DD.MM.YYYY"
				{...otherDatepickerProps}
			/>
		</DatesProvider>
	);
};
