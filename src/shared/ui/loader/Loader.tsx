import Image from "next/image";
import s from "./Loader.module.css";
import clsx from "clsx";

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
