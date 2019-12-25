import React, { Component } from 'react';
import Registration from '../../_auth/Registration';
import Login from '../../_auth/Login';

export default class AuthForms extends Component {
	handleSuccessfulAuth = (data) => {
		this.props.handleLogin(data);
		this.props.history.push('/dashboard');
	};

	render() {
		return (
			<div>
				<h2>Status: {this.props.loggedInStatus}</h2>
				<Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
				<Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
			</div>
		);
	}
}
