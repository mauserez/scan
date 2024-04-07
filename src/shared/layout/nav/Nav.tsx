import Link from "next/link";
import s from "./Nav.module.css";

type NavProps = {
	closeNav?: () => void;
};

export const Nav = (props: NavProps) => {
	const { closeNav } = props;

	const links = [
		{ href: "/", label: "Главная" },
		{ href: "/pricing", label: "Тарифы" },
		{ href: "/faq", label: "FAQ" },
	];

	return (
		<nav className={s.nav}>
			{links.map((link) => (
				<Link onClick={closeNav} key={link.label} href={link.href}>
					{link.label}
				</Link>
			))}
		</nav>
	);
};
