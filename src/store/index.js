import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";

import AuthReducer from './reducers/AuthReducer'
import PostReducer from "./reducers/PostReducer";
import initialReducer from './reducers/InitialDataReducer';


const rootReducer=combineReducers({
    auth:AuthReducer,
	post:PostReducer,
	user:initialReducer,
})


const middlewares = [thunk];
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(...middlewares))
);



export default store