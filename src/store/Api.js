import axios from "axios";
import { api } from "../urlConfig";
import store from "./index";
import { authTypes } from "./types";

const token = window.localStorage.getItem("token");

const Api = axios.create({
	baseURL: api,
	headers: {
		Authorization: token ? `Bearer ${token}` : "",
		"Content-Type": "application/json",
	},
});

Api.interceptors.request.use((req) => {
	const { auth } = store.getState();
	if (auth.token) {
		req.headers.Authorization = `Bearer ${auth.token}`;
	}
	return req;
});

Api.interceptors.response.use(
	(res) => {
		return res;
	},
	(error) => {
		console.log(error.response);
		const status = error.response ? error.response.status : 500;
		if (status && status === 500) {
			localStorage.clear();
			store.dispatch({ type: authTypes.LOGOUT_SUCCESS });
		}
		return Promise.reject(error);
	}
);

export default Api;
