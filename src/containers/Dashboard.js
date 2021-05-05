import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { postTypes } from "../store/types";
import { deletePost, getUserPosts } from "../store/actions/postAction";
import { Link } from "react-router-dom";
import { BsPencilSquare, BsArchive, BsFillClockFill } from "react-icons/bs";
import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";
import Pagination from "../components/Pagination";
import moment from "moment";


export default function Dashboard(props) {
	const {
		redirect,
		posts,
		loading,
		perPage,
		count,
		deleteErrors,
	} = useSelector((state) => state.post);
	const pageNo = props.match.params.page
		? parseInt(props.match.params.page)
		: 1;

	const dispatch = useDispatch();
		
	useEffect(() => {
		if (redirect) {
			dispatch({ type: postTypes.REDIRECT_FALSE });
		}

		if (deleteErrors.length > 0) {
			console.log(deleteErrors);
			deleteErrors.map((err) => toast.error(`${err.msg}`));
		}
	}, [redirect, deleteErrors]);

	useEffect(() => {
		dispatch(getUserPosts(pageNo));
	}, [pageNo]);

	const DeletePost = (_id) => {
		const confirm = window.confirm("Are you really want to delete this post?");

		if (confirm) {
			dispatch(deletePost(_id));
		}
	};

	return (
		<>
			<Helmet>
				<title>User Dashboard</title>
				<meta name='description' content='Its your dashboard' />
			</Helmet>
			<div>
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
				Dashboard
			</div>
			<div className='container mt-100'>
				<div className='row'>
					<div className='col-3 px-15 mb-15'>
						<Sidebar />
					</div>

					<div className='col-9'>
						{loading ? (
							<Loader />
						) : postMessage.length > 0 ? (
							posts.map((post, index) => (
								<div className='dashboard_post' key={index}>
									<div className='dashboard_post_title'>
										<Link to={`/post/${post.slug}`}>{post.title}</Link>
										<span>
											<span>
												<BsFillClockFill />
											</span>
											<span>Published -{moment(post.updatedAt).fromNow()}</span>
										</span>
									</div>
									<div className='icons'>
										<Link to={`/post/edit/${post._id}`}>
											<BsPencilSquare className='icon' />
										</Link>
										<Link onClick={(e) => DeletePost(post._id)}>
											<BsArchive className='icon' />
										</Link>
									</div>
								</div>
							))
						) : (
							"You dont have any post yet"
						)}
						<Pagination
							page={pageNo}
							perPage={perPage}
							count={count}
							url='/dashboard'
						/>
					</div>
				</div>
			</div>
		</>
	);
}
