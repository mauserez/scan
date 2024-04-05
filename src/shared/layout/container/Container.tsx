import { ReactNode } from "react";
import s from "./Container.module.css";

type ContainerProps = { children: ReactNode };
export const Container = (props: ContainerProps) => {
	const { children } = props;

	return (
		<section className={s.container}>
			<div className={s.containerContent}>{children}</div>
		</section>
	);
};
