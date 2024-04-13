"use client";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";

type AuthComponentProps = {
	auth?: ReactNode | null;
	notAuth?: ReactNode | null;
};
export const SessionComponent = (props: AuthComponentProps) => {
	const session = useSession();

	const { auth = null, notAuth = null } = props;

	if (session.status === "loading") {
		return null;
	}

	if (session.status === "authenticated") {
		return auth;
	}

	if (session.status === "unauthenticated") {
		return notAuth;
	}
};
