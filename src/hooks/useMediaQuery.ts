'use client';
import React from 'react';

// (max-width: 768px)
export default function useMediaQuery(query: string) {
	/**
    |--------------------------------------------------
    | Component's states
    |--------------------------------------------------
    */
	const [matches, setMatches] = React.useState(false);

	React.useEffect(() => {
		const mediaQuery =
			typeof window === 'undefined' ? null : window.matchMedia(query);

		const updateMatches = () => {
			setMatches(mediaQuery!.matches);
		};

		/**
        |--------------------------------------------------
        | Initial check
        |--------------------------------------------------
        */
		updateMatches();

		/**
        |--------------------------------------------------
        | Listen for changes in viewport size
        |--------------------------------------------------
        */
		mediaQuery!.addEventListener('change', updateMatches);

		/**
        |--------------------------------------------------
        | Clean up listener
        |--------------------------------------------------
        */
		return () => {
			mediaQuery!.removeEventListener('change', updateMatches);
		};
	}, [query]);

	return matches;
}
