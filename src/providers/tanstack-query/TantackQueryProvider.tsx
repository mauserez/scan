"use client";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

type TantackQueryProviderProps = {
	children: ReactNode;
};

export const TantackQueryProvider = (props: TantackQueryProviderProps) => {
	const { children } = props;
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};
