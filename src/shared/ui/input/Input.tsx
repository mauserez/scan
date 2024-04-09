import { TextInput, TextInputProps, InputBase } from "@mantine/core";
import { LegacyRef } from "react";
import s from "./Input.module.css";
import clsx from "clsx";

type InputProps = TextInputProps & {
	ref?: LegacyRef<HTMLInputElement>;
};

export const Input = (props: InputProps) => {
	const { className = "", width = "100%", ...inputProps } = props;
	return (
		<TextInput
			style={{ width: width }}
			className={clsx(s.input, className)}
			{...inputProps}
		/>
	);
};
