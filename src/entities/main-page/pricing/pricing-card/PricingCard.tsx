import { Button, Card } from "@/shared/ui";
import Image from "next/image";

import clsx from "clsx";
import { ReactNode } from "react";
import s from "./PricingCard.module.css";

type PricingTitle = {
	titleText: string;
	titleDescription: string;
	titleBack?: string;
	titleColor?: string;
	titleImage?: ReactNode;
};

type PricingPrice = {
	priceNow: number | string;
	priceLined?: number | string;
	priceDescription: string;
};

export type Pricing = {
	title: PricingTitle;
	price: PricingPrice;
	adv: string[];
	current?: boolean;
};

type PricingCardProps = {
	pricing: Pricing;
};

export const PricingCard = (props: PricingCardProps) => {
	const { pricing } = props;

	const { title, price, adv, current = false } = pricing;

	const {
		titleText,
		titleImage = null,
		titleDescription,
		titleBack,
		titleColor,
	} = title;

	const { priceNow, priceLined = null, priceDescription } = price;

	return (
		<Card
			style={current ? { border: `1px solid ${titleBack}` } : undefined}
			className={s.card}
		>
			<div
				style={{
					backgroundColor: titleBack || undefined,
					color: titleColor || undefined,
				}}
				className={s.title}
			>
				<div className={s.titleHeader}>{titleText}</div>
				<div>{titleDescription}</div>
				<div className={s.titleImage}>{titleImage}</div>
			</div>
			
			<div className={s.body}>
				{current ? <div className={s.curPricingTag}>Текущий тариф</div> : null}

				<div className={s.priceBlock}>
					<div className={s.priceWrap}>
						<div className={s.price}>{priceNow} ₽</div>

						{priceLined ? (
							<div className={s.priceLined}>{priceLined} ₽</div>
						) : null}
					</div>

					<div className={clsx(s.priceDescription, "pricing__description")}>
						{priceDescription !== "" ? priceDescription : <span>&nbsp;</span>}
					</div>
				</div>

				<div className={s.adv}>
					<div className={s.advTitle}>В тариф входит:</div>
					<div className={s.advList}>
						{adv.map((advItem, i) => (
							<div key={i} className={s.advItem}>
								<Image
									src="/images/pricing/icons/check.svg"
									width={30}
									height={30}
									alt="icon"
								/>
								{advItem}
							</div>
						))}
					</div>
				</div>

				<Button
					className={clsx({ [s.curPricingBtn]: current, [s.cardBtn]: true })}
				>
					{current ? "Перейти в личный кабинет" : "Подробнее"}
				</Button>
			</div>
		</Card>
	);
};
