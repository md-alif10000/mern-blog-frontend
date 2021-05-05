import Api from "../Api";
import { authTypes, postTypes, profileTypes } from "../types";
import toast from "react-hot-toast";





export const updateProfile = (form) => {
	return async (dispatch) => {
		try {
			dispatch({ type: profileTypes.USER_UPDATE_REQUEST });
			const res =await Api.put("/update-profile", form);
            const {token}=res.data

			toast.success("Successfully updated..!");

			dispatch({ type: profileTypes.USER_UPDATE_SUCCESS });
            localStorage.setItem("token", token);
            dispatch({type:'SET_TOKEN',
              payload:token})
              dispatch({type:postTypes.REDIRECT_TRUE})



		} catch (error) {

            console.log(error)
			dispatch({ type: profileTypes.USER_UPDATE_FAILURE });
		}
	};
};