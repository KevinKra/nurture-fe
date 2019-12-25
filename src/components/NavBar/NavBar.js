import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';

export default function NavBar(props) {
	const navbarFormat =
		props.loggedInStatus === 'LOGGED_IN' ? (
			<Fragment>
				<Link to="/">Home</Link>
				<button onClick={props.handleLogout}>Logout</button>
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
