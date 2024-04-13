"use client";

import { useSession } from "next-auth/react";

export const useSessionUser = () => {
	const session = useSession();
	return session.data?.user.accessToken;
};

export const useIsAuth = () => {
	const status = useSession().status;
	return status === "authenticated" ? true : false;
};
