import React from "react";
import s from "./UserAvatar.module.css";

export const UserAvatar = () => {
	return (
		<div className={s.container}>
			<div className={s.user}>
				<div className={s.userName}>Алексей А.</div>
				<div className={s.signOut}>Выйти</div>
			</div>
			<div className={s.avatar}></div>
		</div>
	);
};
