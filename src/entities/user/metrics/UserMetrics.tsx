import { useQuery } from "@tanstack/react-query";
import { mainApi } from "@/shared/axios/mainApi";
import { Loader } from "@/shared/ui";

import clsx from "clsx";
import s from "./UserMetrics.module.css";

type Metrics = {
	eventFiltersInfo: {
		usedCompanyCount: number;
		companyLimit: number;
	};
};

export const UserMetrics = () => {
	const { isPending, error, data } = useQuery({
		queryKey: ["repoData"],
		queryFn: () =>
			mainApi.get<Metrics>("/account/info").then((res) => res.data),
	});

	return (
		<div className={s.metrics}>
			{isPending || !data ? null : (
				<>
					<div className={s.metric}>
						<span className={s.metricText}>Использовано компаний</span>
						<span className={s.metricValue}>
							{data.eventFiltersInfo.usedCompanyCount}
						</span>
					</div>
					<div className={s.metric}>
						<span className={s.metricText}>Лимит по компаниям</span>
						<span className={clsx(s.metricValue, s.metricLimit)}>
							{data.eventFiltersInfo.companyLimit}
						</span>
					</div>
				</>
			)}
		</div>
	);
};
