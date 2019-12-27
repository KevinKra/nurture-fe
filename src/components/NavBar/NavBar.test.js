import React from 'react';
import { shallow } from 'enzyme';
import NavBar from './NavBar';

describe('NavBar', () => {
	it('renders the correct navbar if the user is not logged in', () => {
		const wrapper = shallow(<NavBar />);
		expect(wrapper).toMatchSnapshot();
	});
	it('renders the correct navbar when the user logged in', () => {
		const wrapper = shallow(<NavBar loggedInStatus={'LOGGED_IN'} />);
		expect(wrapper).toMatchSnapshot();
	});
});
