import { signOut } from "next-auth/react";
import Image from "next/image";
import s from "./UserAvatar.module.css";
import { memo } from "react";

export const UserAvatar = memo(function userAvatar() {
	return (
		<div className={s.container}>
			<div className={s.user}>
				<div className={s.userName}>Алексей А.</div>
				<div onClick={() => signOut()} className={s.signOut}>
					Выйти
				</div>
			</div>
			<div className={s.avatar}>
				<Image
					rel="preload"
					priority={true}
					src="/icons/avatar.svg"
					alt="avatar"
					fill
				/>
			</div>
		</div>
	);
});
