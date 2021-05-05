import { authTypes, postTypes, userTypes } from "../types";

const initState = {
	loading: false,
	posts: [],
	perPage: 0,
	count: 0,
	message: "",
	singlepost: {},
};

const initialReducer = (state = initState, action) => {
	const { payload } = action;

	switch (action.type) {
		case postTypes.GET_SINGLE_POST_REQUEST:
			return (state = { ...state, loading: true });
		case postTypes.GET_SINGLE_POST_SUCCESS:
			return (state = {
				...state,
				loading: false,
				singlepost: action.payload.post,
			});
		case userTypes.GET_POSTS_REQUEST:
			return (state = {
				...state,
				loading: true,
			});

		case userTypes.GET_POSTS_SUCCESS:
			return (state = {
				...state,
				loading: false,
                posts:action.payload.posts,
                perPage:action.payload.perPage,
                count:action.payload.count
			});
            case userTypes.GET_POSTS_FAILURE:
                return state={
                    ...state,
                    loading:true
                }
		default:
			return state;
	}
};

export default initialReducer;
