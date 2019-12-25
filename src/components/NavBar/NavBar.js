import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';

export default function NavBar(props) {
	return (
		<nav className="top-nav">
			<Link to="/home">Home</Link>
			<Link to="/register">Register</Link>
			<Link to="/login">Login</Link>
			<button onClick={props.handleLogout}>Logout</button>
		</nav>
	);
}
