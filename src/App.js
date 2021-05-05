import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./containers/auth/Login";
import Register from "./containers/auth/Register";
import Home from "./containers/Home";
import { Provider } from "react-redux";
import "./main.scss";
import store from "./store";
import Dashboard from "./containers/Dashboard";
import PrivateRoute from "./private/PrivateRoute";
import RouteLink from "./private/RouteLink";
import NotFound from "./containers/NotFound";
import Create from "./containers/Create";
import Edit from "./containers/Edit";
import UpdateProfile from "./containers/UpdateProfile";
import ChangePassword from "./containers/ChangePassword";
import Details from "./containers/Details";

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<Switch>
					<RouteLink path='/login' exact component={Login} />
					<RouteLink path='/register' exact component={Register} />
					<PrivateRoute path='/dashboard/:page?' exact component={Dashboard} />
					<PrivateRoute path='/create' exact component={Create} />
					<PrivateRoute
						path='/dashboard/profile/update/:id?'
						exact
						component={UpdateProfile}
					/>
					<PrivateRoute
						path='/dashboard/profile/change-password/:id?'
						exact
						component={ChangePassword}
					/>
					<PrivateRoute path='/post/edit/:id' exact component={Edit} />
					<Route path='/:page?' exact component={Home} />
					<Route path='/post/:slug' exact component={Details} />
					<Route path='/home/:page?' exact component={Home} />
					<Route component={NotFound} />
				</Switch>
			</Router>
		</Provider>
	);
}

export default App;
