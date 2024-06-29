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
import OrderForm from '../components/OrderForm';

export default function CreateOrder() {
	return (
		<div style={styles.wrapper}>
			<h1 style={styles.header}>Create Order</h1>
			{/**
            |--------------------------------------------------
            | Order form
            |--------------------------------------------------
            */}
			<OrderForm />
		</div>
	);
}

/**
|--------------------------------------------------
| Create order styles
|--------------------------------------------------
*/
const styles = {
	/**
    |--------------------------------------------------
    | Wrapper styles
    |--------------------------------------------------
    */
	wrapper: {
		width: '100%',
		paddingTop: 40,
		maxWidth: '800px',
		overflowY: 'auto',
		paddingInline: '4%',
		marginInline: 'auto',
	} as React.CSSProperties,
	/**
    |--------------------------------------------------
    | header
    |--------------------------------------------------
    */
	header: {
		fontSize: 24,
		fontWeight: '700',
	} as React.CSSProperties,
} as const;
