"use client";
import Image from "next/image";
import { HeaderLogo, Nav, NavSignButtons } from "..";
import s from "./Header.module.css";
import { useState } from "react";
import clsx from "clsx";

export const Header = () => {
	const [isNavOpen, setIsNavOpen] = useState(false);

	return (
		<header className={s.header}>
			<div className={s.headerContent}>
				<HeaderLogo />

				<div
					className={clsx({
						[s.headerNav]: true,
						[s.headerNavActive]: isNavOpen,
					})}
				>
					<Image
						onClick={() => {
							setIsNavOpen(false);
						}}
						width={25}
						height={25}
						src="/images/menu/menu-icon-close.svg"
						className={s.menuClose}
						alt="menu-collapse-close"
					/>
					<Nav />
					<NavSignButtons />
				</div>
				<Image
					onClick={() => {
						setIsNavOpen(true);
					}}
					width={30}
					height={30}
					src="/images/menu/menu-icon-open.svg"
					className={s.menuOpen}
					alt="menu-collapse-open"
				/>
			</div>
		</header>
	);
};
