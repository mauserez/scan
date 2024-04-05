import Image from "next/image";
import s from "./FooterLogo.module.css";

export const FooterLogo = () => {
	return (
		<div className={s.logo}>
			<Image
				fill
				sizes="(max-width: 500px) 111px, 141px"
				src="/images/logo/logo-footer.svg"
				alt="logo"
				priority={true}
			/>
		</div>
	);
};
