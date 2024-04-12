import { TextInput, TextInputProps, InputBase } from "@mantine/core";
import { LegacyRef } from "react";
import s from "./Input.module.css";
import clsx from "clsx";

type InputProps = TextInputProps & {
	ref?: LegacyRef<HTMLInputElement>;
};

export const Input = (props: InputProps) => {
	const { className = "", ...inputProps } = props;
	return <TextInput className={clsx(s.input, className)} {...inputProps} />;
};
