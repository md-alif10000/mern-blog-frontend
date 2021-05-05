import { authTypes } from "../types";
import axios from "axios";
import toast, { dispatch } from "react-hot-toast";
import { Redirect } from "react-router";
import Api from "../Api";

export const register = (state) => {
	return async (dispatch) => {
	
		dispatch({ type: authTypes.REGISTER_REQUEST });

		try {
			const res = await Api.post("/register", state);
			console.log(res.data);
			console.log("alif");
			const { token } = res.data;
			if (res.status == 201) {
				toast.success("Successfully Registered...!");
				dispatch({
					type: authTypes.REGISTER_SUCCESS,
				});
				localStorage.setItem("token", token);
				dispatch({ type: "SET_TOKEN", payload: token });
				
			}
		} catch (error) {
			console.log(error)
			console.log(error.response.data.errors);

			dispatch({
				type: authTypes.REGISTER_FAILURE,
				payload: error.response.data.errors,
			});
		}
	};
};

export const login = (state) => {
	return async (dispatch) => {
	
		dispatch({ type: authTypes.LOGIN_REQUEST });

		try {
			const res = await Api.post("/login", state);
			console.log(res);
			const { token } = res.data;
			if (res.status == 200) {
				toast.success("Login successful..!");
				dispatch({
					type: authTypes.LOGIN_SUCCESS,
				});
				localStorage.setItem("token", token);
				dispatch({ type: "SET_TOKEN", payload: token });
				
			}
		} catch (error) {
			console.log(error.response.data.errors);

			dispatch({
				type: authTypes.LOGIN_FAILURE,
				payload: error.response.data.errors,
			});
		}
	};
};

export const logout = () => {
	return async (dispatch) => {
		console.log('Logging out........')
		try {
			dispatch({ type: authTypes.LOGOUT_REQUEST });

			localStorage.removeItem("token");
	
			dispatch({ type: authTypes.LOGOUT_SUCCESS });
			
		} catch (error) {
			console.log(error);
		}
	};
};


