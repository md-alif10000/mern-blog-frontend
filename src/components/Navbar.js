 import React from 'react'
 import {useSelector ,useDispatch} from 'react-redux'
 import {Link} from 'react-router-dom'
import { logout } from '../store/actions/authAction'

 
 export default function Navbar() {
	 const {user}= useSelector(state => state.auth)
const dispatch = useDispatch()
     return (
				<nav className='navbar'>
					<div className='container'>
						<div className='navbar_row'>
							<div className='navbar_left'>
								<Link to='/'>
									<img width='200px' src='/images/logo.jpg' />
								</Link>
							</div>
							{user ? (
								<div className='navbar_right'>
									<li>
										<Link to='/create'>Create post</Link>
									</li>
									<li>
										<Link to="/dashboard/1">{user.name}</Link>
									</li>
									<li onClick={() => dispatch(logout())}>
										<span to='/logout'>Logout</span>
									</li>
								</div>
							) : (
								<div className='navbar_right'>
									<li>
										<Link to='/login'>Login</Link>
									</li>
									<li>
										<Link to='/register'>Register </Link>
									</li>
								</div>
							)}
						</div>
					</div>
				</nav>
			);
 }
 