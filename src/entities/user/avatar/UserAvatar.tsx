import { signOut } from "next-auth/react";
import Image from "next/image";
import s from "./UserAvatar.module.css";

export const UserAvatar = () => {
	return (
		<div className={s.container}>
			<div className={s.user}>
				<div className={s.userName}>Алексей А.</div>
				<div onClick={() => signOut()} className={s.signOut}>
					Выйти
				</div>
			</div>
			<div className={s.avatar}>
				<Image priority src="/icons/avatar.svg" alt="avatar" fill />
			</div>
		</div>
	);
};
