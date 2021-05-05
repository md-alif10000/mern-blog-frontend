import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { BsPencilSquare, BsArchive, BsFillClockFill } from "react-icons/bs";
import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";
import Pagination from "../components/Pagination";
import moment from "moment";
import { getInitialPosts } from "../store/actions/initialDataAction";
import { generatePublicUrl } from "../urlConfig";
const { htmlToText } = require("html-to-text");

export default function Home(props) {
	const { posts, loading, perPage, count } = useSelector((state) => state.user);

	const pageNo = props.match.params.page
		? parseInt(props.match.params.page)
		: 1;

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getInitialPosts(pageNo));
	}, [pageNo]);

	return (
		<>
			<Helmet>
				<title>Home page</title>
				<meta
					name='description'
					content='Mern stack blog site | publish your blog and earn from this website'
				/>
			</Helmet>
			<div className='container'>
				<div className='row mt-100'>
					<div className='col-8 home'>
						{!loading ? (
							posts.length > 0 ? (
								posts.map((post, index) => (
									<Link to={`/post/${post.slug}`} key={index }>
										<div className='row post-style'>
											<div className='col-8 post-bg'>
												<div className='post'>
													<div className='post_header '>
														<div className='post_header_avater'>Md</div>
														<div className='post_header_user'>
															<span>username</span>
															<span>
																Published-{moment(post.updatedAt).fromNow()}
															</span>
														</div>
													</div>
													<div className='post_body'>
														<h1 className='post_body_title'>
															<Link>{post.title}</Link>
														</h1>
														<div className='post_body_details'>
															{htmlToText(post.body.slice(0, 100))}. . . . read more
														</div>
													</div>
												</div>
											</div>
											<div className='col-4 post_image'>
												<img src={generatePublicUrl(post.image)} />
											</div>
										</div>
									</Link>
								))
							) : (
								"No post found"
							)
						) : (
							<Loader />
						)}

						<Pagination
							url={`/home`}
							page={pageNo}
							perPage={perPage}
							count={count}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
