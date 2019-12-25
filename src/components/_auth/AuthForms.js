import React, { Component, Fragment } from 'react';
import axios from 'axios';

export default class AuthForms extends Component {
	state = {
		email: '',
		password: '',
		password_confirmation: '',
		error: ''
	};

	handleSuccessfulAuth = (data) => {
		this.props.handleLogin(data);
		this.props.history.push('/dashboard');
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	handleRegistration = (e) => {
		e.preventDefault();
		const { email, password, password_confirmation } = this.state;
		axios
			.post(
				'http://localhost:3001/api/v1/registrations',
				{
					user: {
						email: email,
						password: password,
						password_confirmation: password_confirmation
					}
				},
				{ withCredentials: true }
			)
			.then((response) => {
				if (response.data.status === 200) {
					this.handleSuccessfulAuth(response.data);
				}
			})
			.catch((error) => {
				this.setState({ error: error.message });
			});
	};

	handleLogin = (e) => {
		e.preventDefault();
		axios
			.post(
				'http://localhost:3001/api/v1/sessions',
				{
					user: { email: this.state.email, password: this.state.password }
				},
				{ withCredentials: true }
			)
			.then((response) => {
				if (response.data.logged_in) {
					this.handleSuccessfulAuth(response.data);
				}
			})
			.catch((error) => {
				this.setState({ error: error.message });
			});
	};

	render() {
		const { email, password, password_confirmation } = this.state;
		const { loggedInStatus } = this.props;
		const registrationForm = (
			<section>
				<h4>{loggedInStatus}</h4>
				<h2>Registration Form</h2>
				<form onSubmit={this.handleRegistration}>
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={email}
						onChange={this.handleChange}
						required
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={password}
						onChange={this.handleChange}
						required
					/>
					<input
						type="password"
						name="password_confirmation"
						placeholder="Password Confirmation"
						value={password_confirmation}
						onChange={this.handleChange}
						required
					/>

					<button type="submit">Register</button>
				</form>
			</section>
		);

		const loginForm = (
			<section>
				<h4>{loggedInStatus}</h4>
				<h2>Login Form</h2>
				<form onSubmit={this.handleLogin}>
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={email}
						onChange={this.handleChange}
						required
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={password}
						onChange={this.handleChange}
						required
					/>
					<button type="submit">Login</button>
				</form>
			</section>
		);

		const errorReport = (
			<div>
				<h5>{this.state.error}</h5>
			</div>
		);
		return (
			<Fragment>
				{this.state.error && errorReport}
				{this.props.history.location.pathname === '/login' ? loginForm : registrationForm}
			</Fragment>
		);
	}
}
