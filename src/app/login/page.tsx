import { LoginForm } from "@/widgets/login-form/LoginForm";
import Image from "next/image";
import s from "./page.module.css";
import { Suspense } from "react";

export default async function LoginPage() {
	return (
		<main className={s.container}>
			<div className={s.title}>
				Для оформления подписки <br />
				на тариф, необходимо <br />
				авторизоваться.
			</div>
			<div className={s.form}>
				<Suspense fallback={null}>
					<LoginForm />
				</Suspense>
				<div className={s.image}>
					<Image fill src={"/images/login/characters.svg"} alt="characters" />
				</div>
			</div>
		</main>
	);
}
