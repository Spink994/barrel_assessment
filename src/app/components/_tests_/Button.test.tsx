/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import Button from '../Button';

describe('Button component', () => {
	it('renders children when isLoading is false', () => {
		render(<Button>Hello</Button>);

		const buttonElement = screen.getByRole('button');
		expect(buttonElement).toBeInTheDocument();
		expect(buttonElement).toHaveTextContent('Hello');
	});

	it('renders BiCircle icon when isLoading is true', () => {
		render(<Button isLoading />);

		const iconElement = screen.getByRole('img', { name: 'Loading' });
		expect(iconElement).toBeInTheDocument();
	});

	it('applies disabled styles when disabled prop is true', () => {
		render(<Button disabled>Hello</Button>);

		const buttonElement = screen.getByRole('button');
		expect(buttonElement).toHaveStyle({
			opacity: '0.5',
			pointerEvents: 'none',
		});
	});

	it('applies custom styles passed via style prop', () => {
		render(<Button style={{ backgroundColor: 'red' }}>Click me</Button>);

		const buttonElement = screen.getByRole('button');
		expect(buttonElement).toHaveStyle({
			backgroundColor: 'red',
		});
	});

	it('applies className and font styles', () => {
		render(<Button className="custom-class">Click me</Button>);

		const buttonElement = screen.getByRole('button');
		expect(buttonElement).toHaveClass('custom-class');
	});

	it('handles onClick event', () => {
		const handleClick = jest.fn();
		render(<Button onClick={handleClick}>Click me</Button>);

		const buttonElement = screen.getByRole('button');
		fireEvent.click(buttonElement);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
