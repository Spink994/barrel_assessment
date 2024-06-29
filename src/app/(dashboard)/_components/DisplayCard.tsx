import React from 'react';

interface Props {
	value: number;
	label: string;
	icon: React.ReactNode;
}

export default function DisplayCard({ value, label, icon }: Props) {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<div style={{ ...styles.card }}>
			{/**
            |--------------------------------------------------
            | Icons and value
            |--------------------------------------------------
            */}
			<div style={styles.icon_value_wrapper}>
				{icon} <span style={styles.value}>{value}</span>
			</div>
			{/**
            |--------------------------------------------------
            | Label
            |--------------------------------------------------
            */}
			<span style={styles.label}>{label}</span>
		</div>
	);
}

export const styles = {
	/**
    |--------------------------------------------------
    | Card styles
    |--------------------------------------------------
    */
	card: {
		gap: '8px',
		padding: 8,
		height: '100px',
		display: 'flex',
		borderRadius: 6,
		background: 'white',
		flexDirection: 'column',
		justifyContent: 'center',
	} as React.CSSProperties,

	/**
    |--------------------------------------------------
    | Icons and value wrapper styles
    |--------------------------------------------------
    */
	icon_value_wrapper: {
		gap: '8px',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
	} as React.CSSProperties,

	/**
    |--------------------------------------------------
    | Value styles
    |--------------------------------------------------
    */
	value: {
		fontSize: 24,
	} as React.CSSProperties,

	/**
    |--------------------------------------------------
    | Label styles
    |--------------------------------------------------
    */
	label: {
		fontSize: 14,
		marginTop: 4,
		fontWeight: '500',
	} as React.CSSProperties,
} as const;
