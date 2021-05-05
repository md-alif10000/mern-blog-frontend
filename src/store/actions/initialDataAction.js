
import { userTypes } from "../types";
import Api from "../Api";

export const getInitialPosts = (pageNo) => {
	return async (dispatch) => {
		dispatch({ type: userTypes.GET_POSTS_REQUEST });
		try {
			const res = await Api.get(`/initial-data/${pageNo}`);
			console.log(res.data);
			dispatch({ type: userTypes.GET_POSTS_SUCCESS, payload: res.data });
		} catch (error) {
			console.log(error);
		}
	};
};


export const getSinglePost = (slug) => {
	return async (dispatch) => {
		dispatch({ type: userTypes.GET_SINGLE_POST_REQUEST });
		try {
			const res = await Api.get(`/post/${slug}`);
			console.log(res.data);
			dispatch({ type: userTypes.GET_SINGLE_POST_SUCCESS, payload: res.data });
		} catch (error) {
			dispatch({
				type: userTypes.GET_SINGLE_POST_FAILURE,
				payload: error.response.data.errors,
			});
			console.log(error);
		}
	};
};
