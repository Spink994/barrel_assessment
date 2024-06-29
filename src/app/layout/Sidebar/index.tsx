'use client';
/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { TbBorderBottomPlus } from 'react-icons/tb';
import { CgClose, CgMenuHotdog } from 'react-icons/cg';
import { HiClipboardDocumentList } from 'react-icons/hi2';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import useMediaQuery from '@/hooks/useMediaQuery';
import NavigationItem from './_components/NavigationItem';

export default function Sidebar() {
	const media_match =
		typeof window === 'undefined'
			? true
			: useMediaQuery('(min-width: 1020px)');
	/**
	|--------------------------------------------------
	| Component states
	|--------------------------------------------------
	*/
	const [closeSidebar, setCloseSidebar] = React.useState<boolean>(true);
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<React.Fragment>
			{/**
			|--------------------------------------------------
			| Top navbar, shows only on smaller screens
			|--------------------------------------------------
			*/}
			<div style={styles.mobile_navbar(media_match)}>
				<CgMenuHotdog
					size={28}
					onClick={() => setCloseSidebar(false)}
				/>
			</div>
			{/**
			|--------------------------------------------------
			| Main sidebar
			|--------------------------------------------------
			*/}
			<aside
				style={{
					...styles.aside,
					...styles.aside_small(media_match),
					...styles.close_aside(closeSidebar),
				}}
			>
				{/**
				|--------------------------------------------------
				| Close icon on sidebar, shows only on smaller screens
				|--------------------------------------------------
				*/}
				{!media_match && (
					<span
						style={styles.close_icon}
						onClick={() => setCloseSidebar(!closeSidebar)}
					>
						<CgClose />
					</span>
				)}
				{/**
				|--------------------------------------------------
				| Main navigation items
				|--------------------------------------------------
				*/}
				<NavigationItem
					route="/"
					label="Orders"
					icon={<HiClipboardDocumentList size={24} />}
				/>
				<NavigationItem
					route="/create-order"
					label="Create Order"
					icon={<TbBorderBottomPlus size={24} />}
				/>
			</aside>
		</React.Fragment>
	);
}

export const styles = {
	/**
	|--------------------------------------------------
	| Aside styles
	|--------------------------------------------------
	*/
	aside: {
		gap: '12px',
		width: '280px',
		padding: '24px',
		display: 'flex',
		minWidth: '280px',
		background: 'white',
		flexDirection: 'column',
		transition: 'left 0.3s ease',
	} as React.CSSProperties,

	/**
    |--------------------------------------------------
    | Media queries
    |--------------------------------------------------
    */

	mobile_navbar: (state: boolean) => {
		if (!state)
			return {
				height: 49,
				width: '100%',
				paddingLeft: 16,
				display: 'flex',
				position: 'fixed',
				alignItems: 'center',
				background: '#fbfbfb',
			} as React.CSSProperties;
		else
			return {
				display: 'none',
			} as React.CSSProperties;
	},

	/**
	|--------------------------------------------------
	| Close icon
	|--------------------------------------------------
	*/
	close_icon: {
		width: 29,
		height: 29,
		display: 'flex',
		borderRadius: 999,
		alignItems: 'center',
		background: '#9ac1fa47',
		justifyContent: 'center',
	} as React.CSSProperties,

	/**
	|--------------------------------------------------
	| Aside on smaller screen 1020px
	|--------------------------------------------------
	*/

	aside_small: (state: boolean) => {
		if (!state)
			return {
				height: '100vh',
				position: 'fixed',
			} as React.CSSProperties;
	},

	/**
	|--------------------------------------------------
	| animate aside
	|--------------------------------------------------
	*/
	close_aside: (state: boolean) => {
		if (state) return { left: -400 } as React.CSSProperties;
		else return { left: 0 } as React.CSSProperties;
	},
} as const;
