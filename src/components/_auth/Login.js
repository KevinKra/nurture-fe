import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Registration extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			loginErrors: ''
		};
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { email, password } = this.state;
		axios
			.post(
				'http://localhost:3001/sessions',
				{
					user: {
						email: email,
						password: password
					}
				},
				{ withCredentials: true }
			)
			.then((response) => {
				if (response.data.logged_in) {
					this.props.handleSuccessfulAuth(response.data);
				}
			})
			.catch((error) => {
				console.log('Login Error', error);
			});
	};

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={this.state.email}
						onChange={this.handleChange}
						required
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={this.state.password}
						onChange={this.handleChange}
						required
					/>
					<button type="submit">Login</button>
				</form>
			</div>
		);
	}
}

export default withRouter(Registration);
