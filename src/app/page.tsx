import { MainInfo, WhyWe, Pricing } from "@/widgets/main-page";
import s from "./page.module.css";

export default function Home() {
	return (
		<main className={s.container}>
			<MainInfo />
			<WhyWe />
			<Pricing />
		</main>
	);
}
