import Image from "next/image";
import clsx from "clsx";
import s from "./Loader.module.css";

export const Loader = () => {
	return (
		<div className={s.loader}>
			<div className={s.image}>
				<Image
					fill
					src="/icons/loader.png"
					alt="loader"
					className={clsx(s.loaderIcon, "rotate")}
				/>
			</div>
		</div>
	);
};
