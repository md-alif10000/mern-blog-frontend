import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { postTypes } from "../store/types";
import {
	addComment,
	deletePost,
	getUserPosts,
} from "../store/actions/postAction";
import { Link, useParams } from "react-router-dom";
import { BsPencilSquare, BsArchive, BsFillClockFill } from "react-icons/bs";
import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";
import Pagination from "../components/Pagination";
import moment from "moment";
import { getSinglePost } from "../store/actions/initialDataAction";
import { generatePublicUrl } from "../urlConfig";
import { htmlToText } from "html-to-text";

export default function Details(props) {
	const [comment, setComment] = useState("");
	const { slug } = useParams();

	const { loading, singlepost } = useSelector((state) => state.user);
	const postId = singlepost._id;
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getSinglePost(slug));
	}, [slug]);

	const add_comment = (e) => {
		e.preventDefault();
		console.log({ postId, comment });
		dispatch(addComment({ postId, comment }));
		setComment("");
	};

	if (!singlepost) {
		return <Loader />;
	}
	return (
		<>
			<div className='container'>
				<div className='row mt-100'>
					<div className='col-8'>
						{!loading ? (
							<div className='post_details'>
								<Helmet>
									<title>{`${singlepost.title}`} </title>
									<meta name='description' content={`${singlepost.meta}`} />
								</Helmet>
								<Toaster
									position='top-right'
									reverseOrder={false}
									toastOptions={{
										className: "",
										style: {
											padding: "10px",
											fontSize: "1.5rem",
										},
									}}
								/>
								<div className='post_header'>
									<div className='post_header_avater'>
										MA
										{singlepost.userName ? singlepost.userName[0] : ""}
									</div>
									<div className='post_header_user'>
										<span>Username</span>
										<span>
											{moment(singlepost.updatedAt).format("MMM Do YY")}
										</span>
									</div>
								</div>

								<div className='post_body'>
									<h1 className='post__body_title'>{singlepost.title}</h1>
									<div className='post_body_image'>
										<img
											src={generatePublicUrl(singlepost.image)}
											alt={singlepost.image}
										/>
									</div>

									<div className='post_body_details'>
										{htmlToText(singlepost.body)}
									</div>
								</div>
								{user ? (
									<div className='post_comment'>
										<form>
											<div className='group'>
												<input
													type='txt'
													className='group_control'
													placeholder='Write a comment...'
													value={comment}
													onChange={(e) => setComment(e.target.value)}
												/>
												<div>
													<input
														type='submit'
														value='Post comment'
														className='btn btn-default'
														onClick={add_comment}
													/>
												</div>
											</div>
										</form>
									</div>
								) : (
									<Link to='/login' className="btn btn-default ">Login to put a comment</Link>
								)}
							</div>
						) : (
							<Loader />
						)}
					</div>

					<div className='col-4'></div>
				</div>
			</div>
		</>
	);
}
