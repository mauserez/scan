import { Article } from "@/shared/ui";
import { Carousel } from "@/entities/main-page/why-we/carousel/Carousel";

export const WhyWe = () => {
	const Title = () => {
		return (
			<div>
				почему <br />
				именно мы
			</div>
		);
	};
	return (
		<Article title={<Title />}>
			<Carousel />
		</Article>
	);
};
