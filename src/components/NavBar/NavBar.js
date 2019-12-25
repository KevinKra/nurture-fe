import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './NavBar.scss';

export default function NavBar(props) {
	const handleLogout = () => {
		// needs to have access to router for redirect, but also needs to update app state to logout.
		// if only i was using redux :c
		axios.delete('http://localhost:3001/api/v1/logout', { withCredentials: true });
		props.logoutUser();
		props.history.push('/');
	};

	const navbarFormat =
		props.loggedInStatus === 'LOGGED_IN' ? (
			<Fragment>
				<Link to="/">Home</Link>
				<button onClick={handleLogout}>Logout</button>
			</Fragment>
		) : (
			<Fragment>
				<Link to="/">Home</Link>
				<Link to="/register">Register</Link>
				<Link to="/login">Login</Link>
			</Fragment>
		);

	return <nav className="top-nav">{navbarFormat}</nav>;
}
