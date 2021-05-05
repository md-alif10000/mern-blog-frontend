import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const RouteLink = (props) => {
	const { user } = useSelector((state) => state.auth);
	return user ? (
		<Redirect to='/dashboard' />
	) : (
		<Route path={props.path} exact={props.exact} component={props.component} />
	);
};

export default RouteLink;
