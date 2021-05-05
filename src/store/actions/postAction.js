import { postTypes } from "../types";
import toast, { dispatch } from "react-hot-toast";
import Api from "../Api";

export const createPost = (form) => {
	return async (dispatch) => {
		dispatch({ type: postTypes.CREATE_POST_REQUEST });

		try {
			const res = await Api.post("/create-post", form);

			if (res.status == 201) {
				toast.success("Your post have  created successfully.....!");
				dispatch({
					type: postTypes.CREATE_POST_SUCCESS,
				});
				dispatch({ type: postTypes.REDIRECT_TRUE });
			}
		} catch (error) {
			const errors = error.response.data.errors;

			dispatch({
				type: postTypes.CREATE_POST_FAILURE,
				payload: errors,
			});
		}
	};
};

export const editPost = (form) => {
	return async (dispatch) => {
		dispatch({ type: postTypes.EDIT_POST_REQUEST });

		try {
			const res = await Api.put("/post/edit-post", form);
			console.log(res)

			if (res.status == 201) {
				toast.success("Your post have updated successfully.....!");
				dispatch({
					type: postTypes.EDIT_POST_SUCCESS,
				});
				dispatch({ type: postTypes.REDIRECT_TRUE });
			}
		} catch (error) {
			console.log(error)
			const errors = error.response.data.errors;

			dispatch({
				type: postTypes.EDIT_POST_FAILURE,
				payload: errors,
			});
		}
	};
};

export const deletePost = (_id) => {
	return async (dispatch) => {
		dispatch({ type: postTypes.DELETE_POST_REQUEST });

		try {
			const res = await Api.delete(`/post/delete/${_id}`);

			if (res.status == 200) {
				toast.success("Your post have deleted successfully.....!");
				dispatch({
					type: postTypes.DELETE_POST_SUCCESS,
				});
				dispatch(getUserPosts(1));
				dispatch({ type: postTypes.REDIRECT_TRUE });
			}
		} catch (error) {
			const errors = error.response.data.errors;

			dispatch({
				type: postTypes.DELETE_POST_FAILURE,
				payload: errors,
			});
		}
	};
};

export const getUserPosts = (pageNo) => {
	return async (dispatch) => {
		dispatch({ type: postTypes.GET_USER_POST_REQUEST });
		try {
			const res = await Api.get(`/user/posts/${pageNo}`);
			console.log(res.data);
			dispatch({ type: postTypes.GET_USER_POST_SUCCESS, payload: res.data });
		} catch (error) {
			console.log(error);
		}
	};
};

export const getSinglePost = (slug) => {
	return async (dispatch) => {
		dispatch({ type: postTypes.GET_SINGLE_POST_REQUEST });
		try {
			const res = await Api.get(`/post/${slug}`);
			console.log(res.data);
			dispatch({ type: postTypes.GET_SINGLE_POST_SUCCESS, payload: res.data });
		} catch (error) {
			dispatch({
				type: postTypes.GET_SINGLE_POST_FAILURE,
				payload: error.response.data.errors,
			});
			console.log(error);
		}
	};
};

export const addComment = ({ postId, comment }) => {
	return async (dispatch) => {
		try {
			const res = await Api.post(`/post/add-comment/${postId}`, { comment });

			console.log(res.data)
			if (res.status == 201) {
				toast.success("Comment has been posted successfully..!");
			}

			// dispatch(getSinglePost(postId));
		} catch (error) {
			console.log(error);
		}
	};
};
