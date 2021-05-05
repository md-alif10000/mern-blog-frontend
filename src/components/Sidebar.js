import React from 'react'
import {useSelector} from "react-redux"
import { Link } from 'react-router-dom'

export default function Sidebar(props) {
	const {user}= useSelector(state => state.auth)
	
    return (
			<div className='sidebar'>
				<h3>Settings</h3>
				<div className='sidebar_element'>
					<Link to='/'> Name: {user.name}</Link>
					<Link to='/'>Username: {user.username}</Link>
					<Link to='/'>Email: {user.email}</Link>
					<Link to='/dashboard/profile/change-password'>
						Change Password
					</Link>
					<Link to={`/dashboard/profile/update/${user._id}`}>
						Update Profile
					</Link>
				</div>
			</div>
		);
}
