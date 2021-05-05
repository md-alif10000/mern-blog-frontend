import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function ChangePassword() {
	const [state, setstate] = useState({
		password: "",
		confirmPassword: "",
	});

	const handleInputs = (e) => {
		setstate({ ...state, [e.target.name]: e.target.value });
	};

	const change_password = () => {};

	return (
		<div className='container mt-100'>
			<div className='row justify-sb'>
				<div className='col-4'>
					<Sidebar />
				</div>

				<div className='col-6'>
					<div className='card'>
						<h3 className='card_h3'>Change your password</h3>

						<div className='group'>
							<label htmlFor='password'>Password</label>
							<input
								className='group_control'
								type='password'
								placeholder='Your full name...'
								name='password'
								id='password'
								value={state.password}
								onChange={handleInputs}
							/>
						</div>

						<div className='group'>
							<label htmlFor='confirmPassword'>Confirm Password</label>
							<input
								className='group_control'
								type='password'
								placeholder='Your full name...'
								name='confirmPassword'
								id='confirmPassword'
								value={state.confirmPassword}
								onChange={handleInputs}
							/>
						</div>

						<div className='group'>
							<button
								className='btn btn-default btn-block'
								onClick={(e) => change_password(e)}>
								Change Password
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
