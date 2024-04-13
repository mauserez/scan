"use client";

import { Button } from "@/shared/ui";
import Image from "next/image";
import s from "./MainInfo.module.css";
import { useRouter } from "next/navigation";
import { useIsAuth } from "@/shared/session/clientHooks";

export const MainInfo = () => {
	const auth = useIsAuth();
	const router = useRouter();

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
				{auth ? (
					<Button
						onClick={() => {
							router.push("/search");
						}}
						className={s.btn}
					>
						Запросить данные
					</Button>
				) : null}
			</div>
			<div className={s.image}>
				<Image
					priority
					alt="main-image"
					fill
					src={"/images/main-page/man-search.svg"}
				/>
			</div>
		</div>
	);
};
