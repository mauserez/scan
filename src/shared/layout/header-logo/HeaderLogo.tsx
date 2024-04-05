import Image from "next/image";
import s from "./HeaderLogo.module.css";

export const HeaderLogo = () => {
	return (
		<div className={s.logo}>
			<Image
				fill
				sizes="(max-width: 500px) 111px, 141px"
				src="/images/logo/logo-header.svg"
				alt="logo"
				priority={true}
			/>
		</div>
	);
};
