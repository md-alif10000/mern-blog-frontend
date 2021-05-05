import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import ReactQuill from "react-quill";
import toast, { Toaster } from "react-hot-toast";
import { createPost } from "../store/actions/postAction";
import "react-quill/dist/quill.snow.css";


export default function Create(props) {
	const [currentImage, setCurrentImage] = useState("Choose Image");
	const [image, setImage] = useState(null);
	const [value, setValue] = useState("");
	const [slug, setSlug] = useState("");
	const [title, setTitle] = useState("");
	const [meta, setMeta] = useState("");
	const [slugButton, setSlugButton] = useState(false);
	const [imagePreview, setImagePreview] = useState("");

	const { createErrors, redirect } = useSelector((state) => state.post);
	const { user } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const handleTitle = (e) => {
		setTitle(e.target.value);
		const Slug = e.target.value.trim().split(" ").join("-");
		setSlug(Slug);
		
	};

	const createpost = (e) => {
		e.preventDefault();

		if (image == null) return toast.error(`Image is required`);
		else {
			const ext = image.type.split("/")[1].toLowerCase();
			if (ext !== "jpg" && ext !== "png" && ext !== "jpeg") {
				return toast.error(`${ext} file is not supported`);
			}
		}

		const form = new FormData();
		form.append("title", title);
		form.append("body", value);
		form.append("image", image);
		form.append("slug", slug);
		form.append("meta", meta);
		form.append("user", user._id);
		dispatch(createPost(form));

		// setSlug("");
		// setValue("");
		// setImage(null);
		// setImagePreview("");
		// setMeta("");
		// setTitle("");
	};

	const handleSlug = (e) => {
		setSlugButton(true);
		setSlug(e.target.value);
	};

	const handleUrl = (e) => {
		e.preventDefault();
		const Slug = slug.trim().split(" ").join("-");
		setSlug(Slug);
		console.log(slug);
	};

	const fileHandle = (e) => {
		if(e.target.files.length !==0){
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
		if (createErrors.length > 0) {
			console.log(createErrors);
			createErrors.map((err) => toast.error(`${err.msg}`));
		}
		if (createErrors)console.log(createErrors)
			if (redirect) {
				props.history.push("/dashboard");
			}
	}, [createErrors,redirect]);

	return (
		<div className='mt-100'>
			<Helmet>
				<title>Create new post</title>
				<meta name='description' content='Create new post' />
			</Helmet>
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
			<div className='container'>
				<form>
					<div className='row .ml-minus-15 .mr-minus-15'>
						<div className='col-6 p-15'>
							<div className='card'>
								<h3 className='card_h3'>Create a new post</h3>

								<div className='group'>
									<label htmlFor='title'>Post title</label>
									<input
										className='group_control'
										type='text'
										placeholder='Post title...'
										name='title'
										id='title'
										onChange={handleTitle}
									/>
								</div>
								<div className='group'>
									<label htmlFor='image' className='image_label'>
										{currentImage}
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
									<label htmlFor='body'>Write your blog....</label>
									<ReactQuill
										style={{ padding: "10px 0px" }}
										placeholder='write your post body....'
										value={value}
										onChange={setValue}
									/>
								</div>
							</div>
						</div>

						<div className='col-6 p-15'>
							<div className='card'>
								<div className='group'>
									<label htmlFor='slug'>Post URL (Slug)</label>
									<input
										className='group_control'
										type='text'
										value={slug}
										placeholder='Post URL....'
										name='slug'
										id='slug'
										onChange={handleSlug}
									/>
								</div>
								<div className='group'>
									{slugButton && (
										<button className='btn btn-default' onClick={handleUrl}>
											Update Slug
										</button>
									)}
								</div>

								<div className='group'>
									<div className='imagePreview'>
										{imagePreview && <img src={imagePreview} />}
									</div>
								</div>
								<div className='group'>
									<label htmlFor='meta'>Meta Description</label>
									<textarea
										className='group_control'
										placeholder='meta description...'
										id='meta'
										name='meta'
										rows='7'
										defaultValue={meta}
										onChange={(e) => setMeta(e.target.value)}></textarea>
									{meta ? (
										<div className='font-16'>{meta.length} Letters</div>
									) : (
										"Add meta description "
									)}
								</div>
								<div className='group'>
									<button
										className='btn btn-default btn-block'
										onClick={(e) => createpost(e)}>
										Create Post
									</button>
									{/* <button
										type='submit'
										className='btn btn-default btn-block'
										value='Create Post'
									/> */}
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
