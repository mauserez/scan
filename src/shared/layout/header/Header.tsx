"use client";
import Image from "next/image";
import { FooterLogo, HeaderLogo, Nav, NavSignButtons } from "..";
import s from "./Header.module.css";
import { useState } from "react";
import clsx from "clsx";

export const Header = () => {
	const [navOpen, setNavOpen] = useState(false);

	const handleNavClose = () => {
		setNavOpen(false);
	};

	const handleNavOpen = () => {
		setNavOpen(true);
	};

	const headerNavClass = clsx({
		[s.headerNav]: true,
		[s.headerNavActive]: navOpen,
	});

	return (
		<header className={s.header}>
			<div className={s.headerContent}>
				<HeaderLogo />
				<div className={headerNavClass}>
					<div className={s.headerNavActiveLogo}>
						<FooterLogo />
						<NavIconClose closeNav={handleNavClose} />
					</div>
					<Nav closeNav={handleNavClose} />
					<NavSignButtons closeNav={handleNavClose} />
				</div>

				<NavIconOpen openNav={handleNavOpen} />
			</div>
		</header>
	);
};

type NavIconCloseProps = {
	closeNav: () => void;
};

const NavIconClose = (props: NavIconCloseProps) => {
	const { closeNav } = props;
	return (
		<Image
			onClick={closeNav}
			width={25}
			height={25}
			src="/images/menu/menu-icon-close.svg"
			className={s.menuClose}
			alt="menu-collapse-close"
		/>
	);
};

type NavIconOpenProps = {
	openNav: () => void;
};

const NavIconOpen = (props: NavIconOpenProps) => {
	const { openNav } = props;

	return (
		<Image
			onClick={openNav}
			width={30}
			height={25}
			src="/images/menu/menu-icon-open.svg"
			className={s.menuOpen}
			alt="menu-collapse-open"
			priority
		/>
	);
};
