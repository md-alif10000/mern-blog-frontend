import React, { useState, useEffect } from "react";
import BgImage from "./BgImage";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { login } from "../../store/actions/authAction";
import Loader from "../../components/Loader";

export default function Login(props) {
	const [state, setstate] = useState({
		email: "",
		password: "",
	});
	const dispatch = useDispatch();
	const { loading, loginErrors,user } = useSelector((state) => state.auth);

	const handleInputs = (e) => {
		setstate({
			...state,
			[e.target.name]: e.target.value,
		});
		console.log(state);
	};

	const userLogin = async (e) => {
		e.preventDefault();
		dispatch(login(state));
	};

	useEffect(() => {
		if (loginErrors.length > 0) {
			loginErrors.map((err) => toast.error(`${err.msg}`));
		}
			if (user) {
				props.history.push("/dashboard");
			}
			if(loading){
				return <Loader/>
			}

		console.log(loginErrors);
	}, [loginErrors,user,loading]);
	if(loading){
		return <Loader/>
	}
	return (
		<>
			<Helmet>
				<title>Login to this website</title>
				<meta name='description' content='Login to start publishing post....' />
			</Helmet>
			<div className='row mt-80'>
				<div className='col-8'>
					<BgImage />
					<Toaster
						position='top-right'
						reverseOrder={false}
						toastOptions={{
							className: "",
							style: {
								border: "1px solid #713200",
								padding: "5px",
								color: "#713200",
								fontSize: "1.3rem",
							},
						}}
					/>
				</div>
				<div className='col-4'>
					<div className='account'>
						<div className='account_section'>
							<form>
								<div className='group'>
									<h3 className='form-heading'>Login</h3>
								</div>
								<div className='group'>
									<input
										type='email'
										name='email'
										className='group_control'
										placeholder='Enter Your Email'
										onChange={handleInputs}
									/>
								</div>
								<div className='group'>
									<input
										type='password'
										name='password'
										className='group_control'
										placeholder='Enter Password'
										onChange={handleInputs}
									/>
								</div>

								<div className='group'>
									<input
										type='submit'
										className='btn btn-default btn-block'
										value={loading ? "..." : "Login"}
										onClick={(e) => userLogin(e)}
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
