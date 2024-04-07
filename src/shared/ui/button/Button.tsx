import React, { ComponentProps } from "react";
import s from "./Button.module.css";
import clsx from "clsx";

type ButtonProps = ComponentProps<"button">;
export const Button = (props: ButtonProps) => {
	const { type = "submit", className = "", children, ...btnProps } = props;

	return (
		<button className={clsx(s.button, className)} type={type} {...btnProps}>
			{children}
		</button>
	);
};
