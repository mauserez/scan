import clsx from "clsx";
import s from "./UserMetrics.module.css";

export const UserMetrics = () => {
	return (
		<div className={s.metrics}>
			<div className={s.metric}>
				<span className={s.metricText}>Использовано компаний</span>
				<span className={s.metricValue}>34</span>
			</div>
			<div>
				<span className={s.metricText}>Лимит по компаниям</span>
				<span className={clsx(s.metricValue, s.metricLimit)}>100</span>
			</div>
		</div>
	);
};
