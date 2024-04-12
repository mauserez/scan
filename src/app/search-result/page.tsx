import { Button, Card } from "@/shared/ui";
import s from "./page.module.css";
import Image from "next/image";

export default function ResultPage() {
	return (
		<div className={s.container}>
			<div className={s.mainSection}>
				<div className={s.mainSectionTitle}>
					<div className={s.title}>Ищем. Скоро будут результаты</div>
					<div className={s.smallTitle}>
						Поиск может занять некоторое время,
						<br /> просим сохранять терпение.
					</div>
				</div>
				<div className={s.image}>
					<Image
						fill
						alt="girl-searching"
						src="/images/pages/search/girl.svg"
					/>
				</div>
			</div>
			<div className={s.scrollerSection}>
				<div>
					<div className={s.subTitle}>Общая сводка</div>
					<div className={s.subTitleNote}>Найдено 4 221 вариантов</div>
				</div>
				<div className={s.scroller}>
					<div className={s.scrollerTitle}>
						<div>Период</div>
						<div>Всего</div>
						<div>Риски</div>
					</div>
					<div className={s.scrollerBody}>
						<div className={s.scrollerBodyItem}>
							<div>10.09.2021</div>
							<div>5</div>
							<div>0</div>
						</div>
						<div className={s.scrollerBodyItem}>
							<div>13.09.2021</div>
							<div>2</div>
							<div>0</div>
						</div>
					</div>
				</div>
			</div>

			<div className={s.articleSection}>
				<div className={s.subTitle}>Список документов</div>
				<div className={s.articleList}>
					<Card>
						<div className={s.article}>
							<div className={s.articleDate}>
								<div>13.09.2021</div>
								<div className={s.articleDate}>Комсомольская правда KP.RU</div>
							</div>
							<div className={s.articleTitle}>
								Скиллфэктори - лучшая онлайн-школа для будущих айтишников
							</div>
							<div className={s.articleBadge}>Технические новости</div>
							<div className={s.articleImage}></div>
							<div className={s.articleText}>
								<p>
									SkillFactory — школа для всех, кто хочет изменить свою карьеру
									и жизнь. С 2016 года обучение прошли 20 000+ человек из 40
									стран с 4 континентов, самому взрослому студенту сейчас 86
									лет. Выпускники работают в Сбере, Cisco, Bayer, Nvidia, МТС,
									Ростелекоме, Mail.ru, Яндексе, Ozon и других топовых
									компаниях.
								</p>
								<br />
								<p>
									Принципы SkillFactory: акцент на практике, забота о студентах
									и ориентир на трудоустройство. 80% обучения — выполнение
									упражнений и реальных проектов. Каждого студента поддерживают
									менторы, 2 саппорт-линии и комьюнити курса. А карьерный центр
									помогает составить резюме, подготовиться к собеседованиям и
									познакомиться с IT-рекрутерами.
								</p>
							</div>
							<div className={s.articleFooter}>
								<button className={s.articleButton}>Читать в источнике</button>
								<div className={s.articleLetterCount}>2 543 слова</div>
							</div>
						</div>
					</Card>
				</div>
				<Button className={s.showMore}>Показать больше</Button>
			</div>
		</div>
	);
}
