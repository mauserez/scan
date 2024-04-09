import {
	Button as MButton,
	ButtonProps as MButtonProps,
	PolymorphicComponentProps,
} from "@mantine/core";

import clsx from "clsx";
import s from "./Button.module.css";

type ButtonProps = PolymorphicComponentProps<"button", MButtonProps>;

export const Button = (props: ButtonProps) => {
	const { type = "submit", className = "", children, ...btnProps } = props;

	return (
		<MButton className={clsx(s.button, className)} type={type} {...btnProps}>
			{children}
		</MButton>
	);
};
