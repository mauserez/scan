"use client";

import { ArticleTitle } from "@/shared/ui";
import { PRICING_LIST } from "@/entities/main-page/pricing/pricingList";
import { PricingCard } from "@/entities/main-page/pricing/pricing-card/PricingCard";
import { useIsAuth } from "@/shared/session/clientHooks";

import s from "./Pricing.module.css";

export const Pricing = () => {
	const auth = useIsAuth();

	PRICING_LIST[0].current = auth;

	return (
		<div>
			<ArticleTitle>наши тарифы</ArticleTitle>
			<div className={s.cards}>
				{PRICING_LIST.map((pricing, i) => (
					<PricingCard key={i} pricing={pricing} />
				))}
			</div>
		</div>
	);
};
