/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { RiProgress5Fill } from 'react-icons/ri';
import { PiClockCountdownFill } from 'react-icons/pi';
import { TbShoppingCartCancel } from 'react-icons/tb';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import useMediaQuery from '@/hooks/useMediaQuery';
import { Order } from '@/interfaces/order.interface';
import DisplayCard from '../_components/DisplayCard';

interface Props {
	orders: Order[];
}

const OVERVIEW_DATA = (orders: Order[]) => [
	{
		value:
			orders?.filter((order) => order.order_status === 'pending')
				.length || 0,
		color: '#8d7102',
		label: 'Pending Orders',
		background: '#f8c8071b',
		icon: <PiClockCountdownFill size={24} />,
	},
	{
		value:
			orders?.filter((order) => order.order_status === 'in_progress')
				.length || 0,
		color: '#035c9c',
		background: '#0495fc1b',
		label: 'Orders In Progress',
		icon: <RiProgress5Fill size={24} />,
	},
	{
		value:
			orders?.filter((order) => order.order_status === 'cancelled')
				.length || 0,
		color: '#9c0b03',
		background: '#fc10041b',
		label: 'Cancelled Orders',
		icon: <TbShoppingCartCancel size={24} />,
	},
	{
		value:
			orders?.filter((order) => order.order_status === 'completed')
				.length || 0,
		color: '#369c03',
		background: '#36fc041b',
		label: 'Completed Orders',
		icon: <IoCheckmarkDoneCircleSharp size={24} />,
	},
];

export default function Overview({ orders }: Props) {
	const media_match = useMediaQuery('(min-width: 1020px)');
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<div style={{ ...styles.overview, ...styles.mobile(media_match) }}>
			{OVERVIEW_DATA(orders)?.map((overview) => (
				<DisplayCard
					key={overview.label}
					value={overview.value}
					label={overview.label}
					icon={
						<div
							style={{
								color: overview.color,
								...styles.icon_container,
								background: overview.background,
							}}
						>
							{overview.icon}
						</div>
					}
				/>
			))}
		</div>
	);
}

const styles = {
	/**
    |--------------------------------------------------
    | Overview styles
    |--------------------------------------------------
    */
	overview: {
		gap: '12px',
		width: '100%',
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))',
	} as React.CSSProperties,
	/**
    |--------------------------------------------------
    | Icon container styles
    |--------------------------------------------------
    */
	icon_container: {
		width: '50px',
		height: '50px',
		borderRadius: 6,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	} as React.CSSProperties,

	/**
	|--------------------------------------------------
	| Media Queries
	|--------------------------------------------------
	*/
	mobile: (state: boolean) => {
		if (state)
			return {
				paddingTop: 0,
			} as React.CSSProperties;
		else
			return {
				paddingTop: 40,
			} as React.CSSProperties;
	},
} as const;
