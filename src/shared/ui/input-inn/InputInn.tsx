import React from "react";
import {
	InputBase,
	InputBaseProps,
	PolymorphicComponentProps,
} from "@mantine/core";
import inputStyle from "../input/Input.module.css";
import { useMask } from "@react-input/mask";
import clsx from "clsx";

export type InputInnProps = PolymorphicComponentProps<"input", InputBaseProps>;

export const InputInn = (props: InputInnProps) => {
	const {
		className = "",
		label = "Инн компании",
		withAsterisk = true,
		...otherProps
	} = props;

	const innRef = useMask({
		mask: "__ ___ ___ __ __",
		replacement: { _: /\d/ },
	});

	return (
		<InputBase
			className={clsx(inputStyle.input, className)}
			withAsterisk={withAsterisk}
			label={label}
			ref={innRef}
			{...otherProps}
		/>
	);
};
