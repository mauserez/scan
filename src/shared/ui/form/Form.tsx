import { ComponentProps } from "react";
import clsx from "clsx";
import s from "./Form.module.css";

type FormProps = ComponentProps<"form">;
export const Form = (props: FormProps) => {
	const { children, className = "", ...formProps } = props;

	return (
		<form className={clsx(s.form, className)} {...formProps}>
			{children}
		</form>
	);
};
