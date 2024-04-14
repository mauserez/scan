"use client";

import { GetSearchDataResult } from "@/entities/search-page/search-form/api/getSearchData";
import { SearchParams, SearchResults } from "@/widgets/search-page";
import { Dispatch, SetStateAction, useState, createContext } from "react";

export const SearchPageContext = createContext<{
	result: GetSearchDataResult | null;
	setResult: Dispatch<SetStateAction<GetSearchDataResult | null>>;
}>({ result: null, setResult: () => {} });

export default function SearchPage() {
	const [result, setResult] = useState<GetSearchDataResult | null>(null);

	return (
		<SearchPageContext.Provider value={{ result, setResult }}>
			{!result ? <SearchParams /> : <SearchResults />}
		</SearchPageContext.Provider>
	);
}
