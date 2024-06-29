'use client';
/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import useMediaQuery from '@/hooks/useMediaQuery';
import Sidebar from '../layout/Sidebar';

interface Props extends React.ComponentProps<'main'> {}

export default function ChildrenWrapper({ children, className }: Props) {
	const media_match = useMediaQuery('(min-width: 1020px)');
	/**
    |--------------------------------------------------
    | Rendered view
    |--------------------------------------------------
    */
	return (
		<main
			className={className}
			style={{ backgroundColor: '#f0f7fb' }}
		>
			<Sidebar />
			{children}
		</main>
	);
}
