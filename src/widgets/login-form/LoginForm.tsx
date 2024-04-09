"use client";
import { useState } from "react";
import { Button, Form, Input } from "@/shared/ui";
import { useForm, isNotEmpty } from "@mantine/form";
import Image from "next/image";
import { useMask } from "@react-input/mask";

import inputStyle from "../../shared/ui/input/Input.module.css";
import clsx from "clsx";
import s from "./LoginForm.module.css";

const types = {
	login: "Войти",
	register: "Зарегистрироваться",
};

export const LoginForm = () => {
	const inputRef = useMask({
		mask: "___________________________________________",
		replacement: "_",
		modify: (input) => {
			const isNumber = !isNaN(parseInt(input[0]));
			return {
				mask: isNumber
					? "+7 ___ ___ __ __"
					: "___________________________________________",
				replacement: isNumber ? { _: /\d/ } : "_",
				showMask: isNumber ? true : false,
			};
		},
	});

	const form = useForm({
		initialValues: {
			login: "",
			password: "",
		},
		validate: {
			login: isNotEmpty("Неправильный логин"),
			password: isNotEmpty("Неправильный пароль"),
		},
	});

	const [type, setType] = useState<"login" | "register">("login");

	const enabled = form.isValid("login") && form.isValid("password");
	const [loading, setLoading] = useState(false);
	const isNumber = !!(
		Number.isInteger(Number(form.values.login)) && form.values.login
	);

	return (
		<Form className={s.form} onSubmit={form.onSubmit(() => {})}>
			<Image
				className={s.lock}
				src="/images/login/lock.svg"
				alt="lock"
				width={75}
				height={92}
			/>
			<div className={s.title}>
				<div
					onClick={() => {
						setType("login");
					}}
					className={clsx({
						[s.titleItem]: true,
						[s.login]: true,
						[s.titleItemActive]: type === "login",
					})}
				>
					{types.login}
				</div>
				<div
					onClick={() => {
						setType("register");
					}}
					style={{ flex: 2 }}
					className={clsx({
						[s.titleItem]: true,
						[s.register]: true,
						[s.titleItemActive]: type === "register",
					})}
				>
					{types.register}
				</div>
			</div>

			<div className={s.fields}>
				<div className={s.field}>
					<div className={s.label}>Логин или номер телефона:</div>
					<div className={inputStyle.input}>
						<input ref={inputRef} {...form.getInputProps("login")} />
					</div>
				</div>

				<div className={s.field}>
					<div className={s.label}>Пароль:</div>
					<Input type="password" {...form.getInputProps("password")} />
				</div>
			</div>

			<Button
				onClick={() => {
					setLoading(true);
				}}
				loading={loading}
				className={s.btn}
				disabled={!enabled}
			>
				{types[type]}
			</Button>
		</Form>
	);
};