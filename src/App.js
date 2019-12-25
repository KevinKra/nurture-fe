import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './components/_pages/Home/Home';
import Dashboard from './components/_pages/Dashboard/Dashboard';
import NavBar from './components/NavBar/NavBar';
import AuthForms from './components/_auth/AuthForms';
import './App.css';

class App extends Component {
	state = {
		loggedInStatus: 'NOT_LOGGED_IN',
		user: {}
	};

	componentDidMount() {
		this.checkLoginStatus();
	}

	handleLogin = (data) => {
		this.setState({
			loggedInStatus: 'LOGGED_IN',
			user: data.user
		});
	};

	handleLogout = () => {
		axios.delete('http://localhost:3001/logout', { withCredentials: true });
		this.setState({
			loggedInStatus: 'NOT_LOGGED_IN',
			user: {}
		});
	};

	checkLoginStatus = () => {
		axios
			.get('http://localhost:3001/logged_in', { withCredentials: true })
			.then((response) => {
				if (response.data.logged_in && this.state.loggedInStatus === 'NOT_LOGGED_IN') {
					this.setState({ loggedInStatus: 'LOGGED_IN', user: response.data.user });
				} else if (!response.data.logged_in && this.state.loggedInStatus === 'LOGGED_IN') {
					this.setState({ loggedInStatus: 'NOT_LOGGED_IN', user: {} });
				}
			})
			.catch((error) => console.log('hello error.', error));
	};

	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<Route path="/" render={(props) => <NavBar {...props} handleLogout={this.handleLogout} />} />
					<Route exact path="/" component={Home} />
					<Route
						exact
						path="/register"
						render={(props) => (
							<AuthForms
								{...props}
								loggedInStatus={this.state.loggedInStatus}
								handleLogin={this.handleLogin}
							/>
						)}
					/>
					<Route
						exact
						path="/login"
						render={(props) => (
							<AuthForms
								{...props}
								loggedInStatus={this.state.loggedInStatus}
								handleLogin={this.handleLogin}
							/>
						)}
					/>
					<Route
						exact
						path="/dashboard"
						render={(props) => (
							<Dashboard
								{...props}
								loggedInStatus={this.state.loggedInStatus}
								handleLogin={this.handleLogin}
							/>
						)}
					/>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
