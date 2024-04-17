"use client";

import { GetSearchDataResult } from "@/entities/search-page/search-params/search-form/api/getSearchData";
import { SearchParams, SearchResults } from "@/widgets/search-page";
import { useState } from "react";
import { SearchPageContext } from "@/entities/search-page/SearchPageContext";

export default function SearchPage() {
	const [result, setResult] = useState<GetSearchDataResult | null>(null);

	return (
		<SearchPageContext.Provider value={{ result, setResult }}>
			{!result ? <SearchParams /> : <SearchResults />}
		</SearchPageContext.Provider>
	);
}
