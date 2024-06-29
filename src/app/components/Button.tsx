import React from 'react';
import { BiCircle } from 'react-icons/bi';
import { Montserrat } from 'next/font/google';

const monteserrat = Montserrat({ subsets: ['latin'] });

interface Props extends React.ComponentProps<'button'> {
	isLoading?: boolean;
}

export default function Button({
	style,
	children,
	disabled,
	className,
	isLoading,
	...rest
}: Props) {
	/**
    |--------------------------------------------------
    | Rendered Views
    |--------------------------------------------------
    */
	return (
		<button
			type="button"
			style={{
				...styles.disabled(disabled ?? false),
				...styles.base_style,
				...style,
			}}
			className={`${monteserrat.className} ${className}`}
			{...rest}
		>
			{isLoading ? <BiCircle size={19} /> : children}
		</button>
	);
}

/**
|--------------------------------------------------
| Base button styles
|--------------------------------------------------
*/
const styles = {
	base_style: {
		height: 45,
		fontSize: 14,
		border: 'none',
		borderRadius: 8,
		display: 'flex',
		color: '#01218a',
		alignItems: 'center',
		justifyContent: 'center',
		background: '#9ac1fa47',
	} as React.CSSProperties,
	/**
    |--------------------------------------------------
    | Disabled state
    |--------------------------------------------------
    */
	disabled: (state: boolean) => {
		if (state)
			return {
				opacity: 0.5,
				pointerEvents: 'none',
			} as React.CSSProperties;
		else return undefined;
	},
} as const;
