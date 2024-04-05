import { FooterLogo } from "..";
import s from "./Footer.module.css";

export const Footer = () => {
	return (
		<footer className={s.footer}>
			<div className={s.footerContent}>
				<FooterLogo />
				<div className={s.info}>
					<div>
						г. Москва, Цветной б-р, 40
						<br /> +7 495 771 21 11
						<br /> info@skan.ru
					</div>
					<div className={s.copyRight}>Copyright. 2022</div>
				</div>
			</div>
		</footer>
	);
};
