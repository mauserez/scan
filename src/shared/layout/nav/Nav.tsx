import Link from "next/link";
import s from "./Nav.module.css";

export const Nav = () => {
	return (
		<nav className={s.nav}>
			<Link href={"/"}>Главная</Link>
			<Link href={"/pricing"}>Тарифы</Link>
			<Link href={"/fag"}>FAQ</Link>
		</nav>
	);
};
