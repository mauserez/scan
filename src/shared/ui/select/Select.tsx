import { Select as MSelect, SelectProps as MSelectProps } from "@mantine/core";
import s from "./Select.module.css";
import clsx from "clsx";

type SelectProps = MSelectProps;
export const Select = (props: SelectProps) => {
	const { className = "", width = "100%", ...selectProps } = props;

	return (
		<MSelect
			style={{ width: width }}
			className={clsx(s.select, className)}
			{...selectProps}
		></MSelect>
	);
};