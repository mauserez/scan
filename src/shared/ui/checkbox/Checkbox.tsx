import {
	Checkbox as MCheckbox,
	CheckboxProps as MCheckboxProps,
} from "@mantine/core";
import clsx from "clsx";

import s from "./Checkbox.module.css";

type CheckboxProps = MCheckboxProps;
export const Checkbox = (props: CheckboxProps) => {
	const { className = "", ...checkboxProps } = props;
	return (
		<MCheckbox
			radius={0}
			className={clsx(s.checkbox, className)}
			iconColor="#4fcc30"
			color="transparent"
			{...checkboxProps}
		/>
	);
};
