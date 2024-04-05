"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type Props = {
	children: ReactNode;
};
export const NextAuthProvider = (props: Props) => {
	const { children } = props;
	return <SessionProvider refetchInterval={300}>{children}</SessionProvider>;
};
