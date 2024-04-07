import { Button } from "@/shared/ui";
import Image from "next/image";
import s from "./MainInfo.module.css";

export const MainInfo = () => {
	return (
		<div className={s.container}>
			<div className={s.text}>
				<div className={s.bigText}>
					сервис по поиску <br />
					публикаций <br />о компании <br />
					по его ИНН
				</div>
				<div className={s.smallText}>
					Комплексный анализ публикаций, получение данных
					<br /> в формате PDF на электронную почту.
				</div>
				<Button className={s.btn}>Запросить данные</Button>
			</div>
			<div className={s.image}>
				<Image alt="main-image" fill src={"/images/main-page/man-search.svg"} />
			</div>
		</div>
	);
};
