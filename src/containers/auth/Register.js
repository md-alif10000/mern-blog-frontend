import React, { useState, useEffect } from "react";
import BgImage from "./BgImage";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { register } from "../../store/actions/authAction";
import { Redirect } from "react-router-dom";
import Loader from "../../components/Loader";

export default function Register(props) {
	const [state, setstate] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const dispatch = useDispatch();
	const { loading, registerErrors, user } = useSelector((state) => state.auth);

	const handleInputs = (e) => {
		setstate({
			...state,
			[e.target.name]: e.target.value,
		});
		console.log(state);
	};

	const userRegister = async (e) => {
		e.preventDefault();
		if (state.password !== state.confirmPassword) {
			return toast.error(`Password didn't match`);
		}
		dispatch(register(state));
	};

	useEffect(() => {
		if (registerErrors.length > 0) {
			registerErrors.map((err) => toast.error(`${err.msg}`));
		}
		if (user) {
			props.history.push("/dashboard");
		}
		if (loading) {
			return <Loader/>;
		}
	}, [registerErrors, user,loading]);

	if (loading) {
		return <Loader />;
	}
	return (
		<>
			<Helmet>
				<title>Register here</title>
				<meta name='description' content='Login here & start earning...' />
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
									<h3 className='form-heading'>Register</h3>
								</div>
								<div className='group'>
									<input
										name='name'
										type='text'
										className='group_control'
										placeholder='Enter Your Name'
										value={state.name}
										onChange={handleInputs}
									/>
								</div>
								<div className='group'>
									<input
										name='email'
										type='email'
										className='group_control'
										placeholder='Enter Your Email'
										value={state.email}
										onChange={handleInputs}
									/>
								</div>
								<div className='group'>
									<input
										name='password'
										type='password'
										className='group_control'
										placeholder='Enter Password'
										value={state.password}
										onChange={handleInputs}
									/>
								</div>
								<div className='group'>
									<input
										name='confirmPassword'
										type='password'
										className='group_control'
										placeholder='Confirm Password'
										value={state.confirmPassword}
										onChange={handleInputs}
									/>
								</div>
								<div className='group'>
									<input
										type='submit'
										className='btn btn-default btn-block'
										value={loading ? "..." : "Register"}
										onClick={userRegister}
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
