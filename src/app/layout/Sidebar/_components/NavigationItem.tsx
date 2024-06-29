'use client';
/**
 |--------------------------------------------------
 | Npm imports
 |--------------------------------------------------
 */
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiChevronRight } from 'react-icons/bi';

interface Props {
	label: string;
	route: string;
	icon: React.ReactNode;
}

export default function NavigationItem({ icon, label, route }: Props) {
	const pathname = usePathname();

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<Link
			href={route}
			style={{
				...styles.button,
				...styles.active(pathname === route),
			}}
		>
			{/**
			|--------------------------------------------------
			| Label and icon and chevron arrow
			|--------------------------------------------------
			*/}
			<div style={styles.label_icon}>
				{icon}

				<span style={{ fontSize: 14 }}>{label}</span>

				<BiChevronRight
					size={20}
					style={{ marginLeft: 'auto' }}
				/>
			</div>
		</Link>
	);
}

export const styles = {
	/**
	|--------------------------------------------------
	| Label and icons styles
	|--------------------------------------------------
	*/
	label_icon: {
		gap: '8px',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
	} as React.CSSProperties,

	/**
	|--------------------------------------------------
	| Main wrapper
	|--------------------------------------------------
	*/
	button: {
		height: '55px',
		border: 'none',
		borderRadius: 6,
		display: 'flex',
		paddingInline: 16,
		fontWeight: '500',
		alignItems: 'center',
		textDecoration: 'none',
	} as React.CSSProperties,

	/**
	|--------------------------------------------------
	| Active state of the navigatio item
	|--------------------------------------------------
	*/
	active: (state: boolean) => {
		if (state)
			return {
				color: '#01218a',
				background: '#9ac1fa47',
			} as React.CSSProperties;
		else
			return {
				color: '#2c2c2d',
				background: 'transparent',
			} as React.CSSProperties;
	},
} as const;
