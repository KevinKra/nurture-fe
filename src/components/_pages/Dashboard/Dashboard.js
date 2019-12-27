import React from 'react';

export default function Dashboard(props) {
	return (
		<div>
			<h2>{props.loggedInStatus}</h2>
			<h3>Dashboard</h3>
		</div>
	);
}
