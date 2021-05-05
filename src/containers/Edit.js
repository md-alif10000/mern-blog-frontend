import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import ReactQuill from "react-quill";
import toast, { LoaderIcon, Toaster } from "react-hot-toast";
import {
	editPost,
	getSinglePost,
} from "../store/actions/postAction";
import "react-quill/dist/quill.snow.css";
import Loader from "../components/Loader";
import { postTypes } from "../store/types";
import { fromString } from "html-to-text";
import { generatePublicUrl } from "../urlConfig";

export default function Edit(props) {
	const _slug = props.match.params.slug;

	const { editErrors, singlepost, redirect, loading } = useSelector(
		(state) => state.post
	);
	const [currentImage, setCurrentImage] = useState("Choose Image");
	const [image, setImage] = useState(null);
	const [value, setValue] = useState(singlepost ? singlepost.body : "");
	const [slug, setSlug] = useState("");
	const [title, setTitle] = useState("");
	const [meta, setMeta] = useState("");
	const [slugButton, setSlugButton] = useState(false);
	const [imagePreview, setImagePreview] = useState("");

	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleTitle = (e) => {
		setTitle(e.target.value);
		const Slug = e.target.value.trim().split(" ").join("-");
		setSlug(Slug);
	};

	const updatePost = (e) => {
		e.preventDefault();

		if (image == null) return toast.error(`Image is required`);
		else {
			const ext = image.type.split("/")[1].toLowerCase();
			if (ext !== "jpg" && ext !== "png" && ext !== "jpeg") {
				return toast.error(`${ext} file is not supported`);
			}
		}
		const img = singlepost.image;

		const form = new FormData();
		form.append("_id", singlepost._id);
		form.append("title", title);
		form.append("body", value);
		form.append("image", image);
		form.append("img", img);
		form.append("slug", slug);
		form.append("meta", meta);
		form.append("user", user._id);
		dispatch(editPost(form));

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
		dispatch(getSinglePost(_slug));
	}, []);
	useEffect(() => {
		if (editErrors && editErrors.length > 0) {
			editErrors.map((err) => toast.error(`${err.msg}`));
			dispatch({ type: postTypes.SET_ERRORS_EMPTY });
		}
		if (redirect) {
			props.history.push("/dashboard");
		}
		if (loading) {
			<LoaderIcon />;
		}
		// if (!loading) {
		// 	setTitle(singlepost.title);
		// 	setSlug(singlepost.slug);
		// 	setMeta(singlepost.meta);
		// 	// const { body } = singlepost;
		// 	// setValue(body);
		// }
	}, [editErrors, redirect, loading]);

	useEffect(() => {
		setTitle(singlepost.title);
		setSlug(singlepost.slug);
		setMeta(singlepost.meta);
		const { body } = singlepost;
		setValue(body);
		console.log(body);
	}, [singlepost]);

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<Helmet>
				<title>Edit post</title>
				<meta name='description' content='update your existing post' />

				<meta name='description' content='update your existing post' />
				<meta name='description' content='update your existing post' />
			</Helmet>
			<div className='mt-100'>
				{console.log("Alifffffff")}{" "}
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
							<div className='col-8 '>
								<div className='card'>
									<h3 className='card_h3'>Edit your post</h3>
									<div className='group'>
										<label htmlFor='title'>Post title</label>
										<input
											className='group_control'
											type='text'
											placeholder='Post title...'
											name='title'
											id='title'
											value={title}
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
									``{" "}
									<div className='group'>
										<label htmlFor='body'>Edit your blog....</label>
										<ReactQuill
											style={{ padding: "10px 0px" }}
											placeholder='write your post body....'
											value={value}
											onChange={setValue}
										/>
									</div>
								</div>

								<div className='card'>
									<div className='group'>
										<div className='imagePreview'>
											{!imagePreview && (
												<img src={generatePublicUrl(singlepost.image)} />
											)}
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
											onChange={(e) => setMeta(e.target.value)}
											onKeyUp={(e) => setMeta(e.target.value)}></textarea>
										{meta ? (
											<div className='font-16'>{meta.length} Letters</div>
										) : (
											"Add meta description "
										)}
									</div>
									<div className='group'>
										<button
											className='btn btn-default btn-block'
											onClick={(e) => updatePost(e)}>
											Update Post
										</button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
