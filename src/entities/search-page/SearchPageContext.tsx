import { GetSearchDataResult } from "@/entities/search-page/search-params/search-form/api/getSearchData";
import { Dispatch, SetStateAction, createContext } from "react";

export const SearchPageContext = createContext<{
	result: GetSearchDataResult | null;
	setResult: Dispatch<SetStateAction<GetSearchDataResult | null>>;
}>({ result: null, setResult: () => {} });
