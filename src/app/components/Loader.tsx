import React from 'react';
import { PiCircleDashed } from 'react-icons/pi';

export default function Loader() {
	return (
		<div style={styles.loader}>
			<PiCircleDashed
				size={42}
				className="spin"
			/>
		</div>
	);
}

/**
|--------------------------------------------------
| Loading modal styles
|--------------------------------------------------
*/
const styles = {
	loader: {
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	} as React.CSSProperties,
} as const;
