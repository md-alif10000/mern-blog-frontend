import { authTypes, postTypes } from "../types";

const initState = {
	loading: false,
	createErrors: [],
	editErrors:[],
	deleteErrors:[],
	redirect: false,
	posts: [],
	perPage: 0,
	count: 0,
	message: "",
	singlepost:{}
};

const PostReducer = (state = initState, action) => {
	const { payload } = action;

	switch (action.type) {
		case postTypes.CREATE_POST_REQUEST:
			return (state = {
				...state,
				loading: true,
			});

		case postTypes.CREATE_POST_SUCCESS:
			return (state = { ...state, loading: false, createErrors: [] });
		case postTypes.CREATE_POST_FAILURE:
			return (state = { ...state, loading: false, createErrors: payload });

		case postTypes.EDIT_POST_REQUEST:
			return (state = {
				...state,
				loading: true,
			});

		case postTypes.EDIT_POST_SUCCESS:
			return (state = { ...state, loading: false, editErrors: [] });
		case postTypes.EDIT_POST_FAILURE:
			return (state = { ...state, loading: false, editErrors: payload });

		case postTypes.DELETE_POST_REQUEST:
			return (state = {
				...state,
				loading: true,
			});

		case postTypes.DELETE_POST_SUCCESS:
			return (state = { ...state, loading: false, deleteErrors: [] });
		case postTypes.DELETE_POST_FAILURE:
			return (state = { ...state, loading: false, deleteErrors: payload });

		case postTypes.REDIRECT_TRUE:
			return (state = { ...state, redirect: true });

		case postTypes.REDIRECT_FALSE:
			return (state = { ...state, redirect: false });
		case postTypes.GET_USER_POST_REQUEST:
			return (state = { ...state, loading: true });
		case postTypes.GET_USER_POST_SUCCESS:
			return (state = {
				...state,
				loading: false,
				posts: action.payload.posts,
				count: action.payload.count,
				perPage: action.payload.perPage,
			});

		case postTypes.GET_SINGLE_POST_REQUEST:
			return (state = { ...state, loading: true });

		case postTypes.GET_SINGLE_POST_SUCCESS:
			return (state = {
				...state,
				loading: false,
				singlepost: action.payload.post,
			});
		case postTypes.SET_ERRORS_EMPTY:
			return (state = {
				...state,
				createErrors: [],
				editErrors: [],
			});
		default:
			return state;
	}
};

export default PostReducer;
