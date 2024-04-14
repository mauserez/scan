"use server";

import { getServerSession } from "next-auth";
import { authConfig } from "../../../auth.config";

export const session = async () => {
	return await getServerSession(authConfig);
};

export const sessionUser = async () => {
	const session = await getServerSession(authConfig);
	return session?.user;
};

export const isAuth = async () => {
	const session = await getServerSession(authConfig);
	return !!session;
};
