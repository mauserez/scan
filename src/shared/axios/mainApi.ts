import axios from "axios";
import { sessionUser } from "../session/serverHooks";

export const mainApi = axios.create({
	baseURL: "https://gateway.scan-interfax.ru/api/v1",
});

mainApi.interceptors.request.use(async (request) => {
	const user = await sessionUser();

	if (!user) {
		return request;
	}

	request.headers.Authorization = `Bearer ${user.accessToken}`;

	return request;
});
