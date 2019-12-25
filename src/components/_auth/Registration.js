import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Registration extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			password_confirmation: '',
			registrationErrors: ''
		};
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { email, password, password_confirmation } = this.state;
		axios
			.post(
				'http://localhost:3001/registrations',
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
				if (response.data.status === 'created') {
					this.props.handleSuccessfulAuth(response.data);
				}
			})
			.catch((error) => {
				console.log('Registration Error', error);
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
					<input
						type="password"
						name="password_confirmation"
						placeholder="Password Confirmation"
						value={this.state.password_confirmation}
						onChange={this.handleChange}
						required
					/>

					<button type="submit">Register</button>
				</form>
			</div>
		);
	}
}

export default withRouter(Registration);
