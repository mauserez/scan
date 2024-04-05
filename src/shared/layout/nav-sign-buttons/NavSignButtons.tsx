import s from "./NavSignButtons.module.css";

export const NavSignButtons = () => {
	return (
		<div className={s.buttons}>
			<div className={s.register}>Зарегистрироваться</div>|
			<div className={s.login}>Войти</div>
		</div>
	);
};
