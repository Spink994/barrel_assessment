/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { BiHome } from 'react-icons/bi';
import { usePathname } from 'next/navigation';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import NavigationItem from '../NavigationItem';

/**
|--------------------------------------------------
| Mock the usePathname hook
|--------------------------------------------------
*/
jest.mock('next/navigation', () => ({
	usePathname: jest.fn(),
}));

describe('NavigationItem', () => {
	it('renders correctly with the correct props', () => {
		(usePathname as jest.Mock).mockReturnValue('/home');

		const { getByText, container } = render(
			<NavigationItem
				icon={<BiHome />}
				label="Home"
				route="/home"
			/>
		);

		expect(getByText('Home')).toBeInTheDocument();
		expect(container.querySelector('a')).toHaveAttribute('href', '/home');
		expect(container.querySelector('a')).toHaveStyle('color: #01218a');
		expect(container.querySelector('a')).toHaveStyle(
			'background: #9ac1fa47'
		);
	});

	it('renders with inactive styles when route does not match', () => {
		(usePathname as jest.Mock).mockReturnValue('/different-route');

		const { getByText, container } = render(
			<NavigationItem
				icon={<BiHome />}
				label="Home"
				route="/home"
			/>
		);

		expect(getByText('Home')).toBeInTheDocument();
		expect(container.querySelector('a')).toHaveAttribute('href', '/home');
		expect(container.querySelector('a')).toHaveStyle('color: #2c2c2d');
		expect(container.querySelector('a')).toHaveStyle(
			'background: transparent'
		);
	});
});
