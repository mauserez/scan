import { AssocArray } from "@/shared/types";
import { jwtDecode } from "jwt-decode";
import { User } from "next-auth";
import { mainApi } from "@/shared/axios/mainApi";

export type SessionUserType = {
	accessToken: string;
	expire: string;
};

export type AuthParams = {
	login?: string | unknown;
	password?: string | unknown;
};

const ACCESS_ERRORS: AssocArray = {
	"Bad credentials": "Неверный логин или пароль",
};

export const getToken = async (credentials: AuthParams) => {
	console.log(credentials);
	return await mainApi<SessionUserType>({
		url: "/account/login",
		method: "post",
		data: credentials,
	})
		.then(function (response) {
			console.log(response);
			return {
				data: response.data as User,
				status: response.status,
				errorText: "",
			};
		})
		.catch(function (error) {
			const response = error.response;
			const errorAccessText = response.data.error_description;
			console.log(errorAccessText);

			const errorText = ACCESS_ERRORS[errorAccessText] ?? errorAccessText;

			return {
				data: null,
				status: error,
				errorText: errorText,
			};
		});
};
/*
export const refreshAccess = async (refreshToken: string) => {
	return await refreshApi<SessionUserType>({
		method: "post",

		data: { refresh_token: refreshToken },

		headers: { "Content-Type": "multipart/form-data" },
	})
		.then(function (response) {
			const data = prepareTokenData(response.data);

			return { data: data as User, status: response.status, errorText: "" };
		})

		.catch(function (error) {
			return {
				data: null,

				status: "401",

				errorText: "Не удалось обновить токен",
			};
		});
}; */
