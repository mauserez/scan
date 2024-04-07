import Image from "next/image";
import clsx from "clsx";

import s from "./FooterLogo.module.css";
import Link from "next/link";

type FooterLogoProps = {
	className?: string;
};

export const FooterLogo = (props: FooterLogoProps) => {
	const { className = "" } = props;

	return (
		<Link href={"/"}>
			<div className={clsx(s.logo, className)}>
				<Image
					fill
					sizes="(max-width: 500px) 111px, 141px"
					src="/images/logo/logo-footer.svg"
					alt="logo"
					priority={true}
				/>
			</div>
		</Link>
	);
};
