'use client';
/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import Link from 'next/link';
import { BsPlus } from 'react-icons/bs';
import { Montserrat } from 'next/font/google';

const monteserrat = Montserrat({ subsets: ['latin'] });

export default function CreateOrder() {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<div style={{ width: '100%', display: 'flex' }}>
			<Link
				href="/create-order"
				style={styles.button}
				className={monteserrat.className}
			>
				<BsPlus size={24} /> Create Order
			</Link>
		</div>
	);
}

export const styles = {
	/**
    |--------------------------------------------------
    | Create order button
    |--------------------------------------------------
    */
	button: {
		fontSize: 14,
		height: '45px',
		width: '160px',
		display: 'flex',
		marginTop: '42px',
		fontWeight: '500',
		color: '#009afa',
		marginLeft: 'auto',
		borderRadius: '8px',
		alignItems: 'center',
		textDecoration: 'none',
		justifyContent: 'center',
		background: '#009afa1b',
	} as React.CSSProperties,
} as const;
