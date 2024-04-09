import { LoginForm } from "@/widgets/login-form/LoginForm";
import Image from "next/image";
import s from "./page.module.css";

export default function LoginPage() {
	return (
		<main className={s.container}>
			<div className={s.title}>
				Для оформления подписки <br />
				на тариф, необходимо <br />
				авторизоваться.
			</div>
			<div className={s.formWithImage}>
				<LoginForm />
				<div className={s.image}>
					<Image fill src={"/images/login/characters.svg"} alt="characters" />
				</div>
			</div>
		</main>
	);
}
