'use client';
import React from 'react';
import Button from './Button';
import { BiChevronDown } from 'react-icons/bi';

interface Props {
	status: string;
	setStatus: React.Dispatch<React.SetStateAction<string>>;
}

export default function OrderStatus({ status, setStatus }: Props) {
	const _STATUS = ['Completed', 'Cancelled', 'In progress'];
	/**
    |--------------------------------------------------
    | Components states
    |--------------------------------------------------
    */
	const [showStatus, setShowStatus] = React.useState<boolean>(false);
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<div style={styles.container}>
			{/**
            |--------------------------------------------------
            | Status
            |--------------------------------------------------
            */}
			<span style={styles.order_label}>Order Status</span>
			{/**
            |--------------------------------------------------
            | Button status
            |--------------------------------------------------
            */}
			<Button
				style={styles.button}
				onClick={() => setShowStatus(!showStatus)}
			>
				<span style={styles.status_text}>{status}</span>

				<BiChevronDown size={24} />
			</Button>

			{/**
            |--------------------------------------------------
            | Drop down
            |--------------------------------------------------
            */}
			{showStatus && (
				<div style={styles.drop_down_wrapper}>
					{_STATUS.map((stat) => (
						<Button
							key={stat}
							className="hover_button"
							style={styles.status_button}
							onClick={() => {
								setStatus(stat);
								setShowStatus(false);
							}}
						>
							{stat}
						</Button>
					))}
				</div>
			)}
		</div>
	);
}

/**
|--------------------------------------------------
| Order status styles
|--------------------------------------------------
*/
const styles = {
	/**
    |--------------------------------------------------
    | Button drop down
    |--------------------------------------------------
    */
	drop_down_wrapper: {
		left: 0,
		top: '110%',
		width: '100%',
		minHeight: 50,
		borderRadius: 8,
		background: 'white',
		position: 'absolute',
	} as React.CSSProperties,
	/**
    |--------------------------------------------------
    | Order status constainer
    |--------------------------------------------------
    */
	container: {
		width: '100%',
		position: 'relative',
	} as React.CSSProperties,
	/**
    |--------------------------------------------------
    | Order status label
    |--------------------------------------------------
    */
	order_label: {
		fontSize: 14,
		marginBottom: 8,
		display: 'block',
	} as React.CSSProperties,
	/**
    |--------------------------------------------------
    | button
    |--------------------------------------------------
    */
	button: {
		height: 55,
		width: '100%',
		paddingInline: 16,
		justifyContent: 'space-between',
	} as React.CSSProperties,

	/**
    |--------------------------------------------------
    | Status drop down button
    |--------------------------------------------------
    */
	status_button: {
		width: '100%',
		borderRadius: 0,
		paddingInline: 16,
		textAlign: 'start',
		background: 'transparent',
		justifyContent: 'flex-start',
	} as React.CSSProperties,

	/**
    |--------------------------------------------------
    | status text
    |--------------------------------------------------
    */
	status_text: {
		fontSize: 14,
		textTransform: 'capitalize',
	} as React.CSSProperties,
} as const;
