"use client";
import { useState } from "react";
import { Button, Form, Input } from "@/shared/ui";
import { useForm, isNotEmpty } from "@mantine/form";
import Image from "next/image";
import { useMask } from "@react-input/mask";
import { signIn } from "next-auth/react";

import inputStyle from "../../shared/ui/input/Input.module.css";
import clsx from "clsx";
import s from "./LoginForm.module.css";
import { useRouter, useSearchParams } from "next/navigation";

const types = {
	login: "Войти",
	register: "Зарегистрироваться",
};

export const LoginForm = () => {
	const redirectUrl = String(useSearchParams().get("callbackUrl"));
	const host = String(process.env.NEXT_PUBLIC_HOST);
	const onSite = String(redirectUrl).startsWith(host);

	const router = useRouter();

	const inputRef = useMask({
		mask: "````````````````````",
		replacement: "`",
		modify: (input) => {
			const isNumber = !isNaN(parseInt(input[0]));
			return {
				mask: isNumber ? "+7 ___ ___ __ __" : "````````````````````",
				replacement: isNumber ? { _: /\d/ } : "`",
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

	return (
		<Form
			onSubmit={form.onSubmit(async (values) => {
				setLoading(true);

				const res = await signIn("credentials", {
					...form.values,
					redirect: false,
				});

				if (res?.ok) {
					if (onSite) {
						router.push(redirectUrl);
					} else {
						router.push("/");
					}
				}

				setLoading(false);
			})}
			className={s.form}
		>
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

			<Button loading={loading} className={s.btn} disabled={!enabled}>
				{types[type]}
			</Button>

			<div className={s.restore}>Восстановить пароль</div>

			<div className={s.systems}>
				<div className={s.systemLabel}>Войти через</div>
				<div className={s.systemList}>
					<div className={s.system}>
						<Image
							width={60}
							height={20}
							alt="google"
							src="/images/login/google.svg"
						/>
					</div>
					<div className={s.system}>
						<Image
							width={60}
							height={12}
							alt="facebook"
							src="/images/login/facebook.svg"
						/>
					</div>
					<div className={s.system}>
						<Image
							width={56}
							height={16}
							alt="yandex"
							src="/images/login/yandex.svg"
						/>
					</div>
				</div>
			</div>
		</Form>
	);
};
