import { Pricing } from "./pricing-card/PricingCard";
import Image from "next/image";

export const PRICING_LIST: Pricing[] = [
	{
		title: {
			titleText: "Beginner",
			titleDescription: "Для небольшого исследования",
			titleImage: (
				<Image
					width={92}
					height={83}
					src="/images/pricing/images/lamp.svg"
					alt="lamp"
				/>
			),
		},
		price: {
			priceNow: "799",
			priceLined: "1200",
			priceDescription: "или 150 ₽/мес. при рассрочке на 24 мес.",
		},
		adv: [
			"Безлимитная история запросов",
			"Безопасная сделка",
			"Поддержка 24/7",
		],
		current: true,
	},
	{
		title: {
			titleText: "Pro",
			titleDescription: "Для HR и фрилансеров",
			titleBack: "#7ce3e1",
			titleImage: (
				<Image
					width={93}
					height={104}
					src="/images/pricing/images/target.svg"
					alt="lamp"
				/>
			),
		},
		price: {
			priceNow: "1299",
			priceLined: "2600",
			priceDescription: "или 279 ₽/мес. при рассрочке на 24 мес.",
		},
		adv: [
			"Все пункты тарифа Beginner",
			"Экспорт истории",
			"Рекомендации по приоритетам",
		],
	},
	{
		title: {
			titleText: "Business",
			titleDescription: "Для корпоративных клиентов",
			titleBack: "#000",
			titleColor: "#fff",
			titleImage: (
				<Image
					width={96}
					height={80}
					src="/images/pricing/images/note.svg"
					alt="lamp"
				/>
			),
		},
		price: {
			priceNow: "2379",
			priceLined: "3700",
			priceDescription: "",
		},
		adv: [
			"Все пункты тарифа Pro",
			"Безлимитное количество запросов",
			"Приоритетная поддержка",
		],
	},
];
