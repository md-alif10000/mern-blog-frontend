import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import toast, { Toaster } from "react-hot-toast";
import { updateProfile } from "../store/actions/profileAction";
import { generatePublicUrl } from "../urlConfig";
import { useHistory } from "react-router";

export default function UpdateProfile() {
	const [image, setImage] = useState("");
	const [currentImage, setCurrentImage] = useState("");
	const [imagePreview, setImagePreview] = useState("");

	const { loading, user,redirect } = useSelector((state) => state.auth);
 const history=useHistory()
	const [state, setstate] = useState({
		name: user.name,
		email: user.email,
		username: user.username,
	});
	const dispatch = useDispatch();

	const handleInputs = (e) => {
		setstate({
			...state,
			[e.target.name]: e.target.value,
		});
		console.log(state);
	};

	const fileHandle = (e) => {
		if (e.target.files.length !== 0) {
			setImage(e.target.files[0]);
			setCurrentImage(e.target.files[0].name);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
			};

			reader.readAsDataURL(e.target.files[0]);
		}
	};

	useEffect(() => {
		if (redirect) {
			history.push("/dashboard");
		}
	}, [redirect]);

	const update_profile = (e) => {
		e.preventDefault();
		console.log(image);
		const form = new FormData();
		form.append("name", state.name);
		form.append("username", state.username);
		form.append("email", state.email);
		form.append("profilePicture", image);

		dispatch(updateProfile(form));
	};
	return (
		<div className='container'>
			<Toaster
				position='top-right'
				reverseOrder={false}
				toastOptions={{
					className: "",
					style: {
						border: "1px solid #713200",
						padding: "10px",
						color: "#713200",
						fontSize: "1.5rem",
					},
				}}
			/>
			<div className='row mt-100 justify-sb flex'>
				<div className='col-4'>
					<Sidebar />
				</div>

				<div className='col-6'>
					<div className='card'>
						<h3 className='card_h3'>Update your profile</h3>
						<div className='group'>
							<div className='updateProfileImagePreview'>
								{imagePreview ? (
									<img src={imagePreview} />
								) : user.profilePicture ? (
									<img src={generatePublicUrl(user.profilePicture)} />
								) : (
									<img src='/images/empty_profile.png' />
								)}
							</div>
						</div>
						<div className='group'>
							<label htmlFor='image' className='image_label'>
								{currentImage ? currentImage : "Select your image"}
							</label>
							<input
								className='group_control'
								type='file'
								placeholder='Post title...'
								name='picture'
								id='image'
								onChange={fileHandle}
							/>
						</div>

						<div className='group'>
							<label htmlFor='name'>Name</label>
							<input
								className='group_control'
								type='text'
								placeholder='Your full name...'
								name='name'
								id='name'
								value={state.name}
								onChange={handleInputs}
							/>
						</div>

						<div className='group'>
							<label htmlFor='username'>Username</label>
							<input
								className='group_control'
								type='text'
								placeholder='Your username...'
								name='username'
								id='username'
								value={state.username}
								onChange={handleInputs}
							/>
						</div>
						<div className='group'>
							<label htmlFor='email'>Email</label>
							<input
								className='group_control'
								type='text'
								placeholder='Your full name...'
								name='email'
								id='email'
								value={state.email}
								onChange={handleInputs}
							/>
						</div>

						<div className='group'>
							<button
								className='btn btn-default btn-block'
								onClick={(e) => update_profile(e)}>
								Update Profile
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
