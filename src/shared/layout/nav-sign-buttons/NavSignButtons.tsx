import Link from "next/link";
import s from "./NavSignButtons.module.css";

type NavSignButtonsProps = {
	closeNav?: () => void;
};
export const NavSignButtons = (props: NavSignButtonsProps) => {
	const { closeNav } = props;
	const links = [
		{ href: "/register", label: "Зарегистрироваться", className: "register" },
		{ href: "/login", label: "Войти", className: "login" },
	];

	return (
		<div className={s.buttons}>
			{links.map((link) => (
				<Link
					onClick={closeNav}
					className={s[link.className]}
					key={link.href}
					href={link.href}
				>
					{link.label}
				</Link>
			))}
		</div>
	);
};
