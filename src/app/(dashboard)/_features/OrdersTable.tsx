'use client';
/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { BiEdit } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { TbDatabaseOff, TbTrashX } from 'react-icons/tb';
/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import Loader from '@/app/components/Loader';
import formatDate from '@/helpers/dateFormatter';
import useMediaQuery from '@/hooks/useMediaQuery';
import { Order } from '@/interfaces/order.interface';
import { deleteOrder } from '@/services/userServices';

interface Props {
	orders: Order[];
}

export default function OrdersTable({ orders }: Props) {
	const router = useRouter();
	const media_match = useMediaQuery('(min-width: 1020px)');
	/**
	|--------------------------------------------------
	| Component states
	|--------------------------------------------------
	*/
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	/**
	|--------------------------------------------------
	| Handles deleting an order
	|--------------------------------------------------
	*/
	const handleDeleteOrder = async (order_id: string) => {
		try {
			setIsLoading(true);
			/**
			|--------------------------------------------------
			| api call to delete an order
			|--------------------------------------------------
			*/
			await deleteOrder(order_id);
			window.location.reload();
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return isLoading ? (
		<Loader />
	) : (
		<div
			style={{
				...styles.table_wrapper,
				...styles.table_wrapper_small(media_match),
			}}
		>
			<table
				style={{ ...styles.table, ...styles.table_small(media_match) }}
			>
				{/**
                |--------------------------------------------------
                | Table head
                |--------------------------------------------------
                */}
				<thead style={styles.thead}>
					<tr>
						<td style={styles.tdata}>Order ID</td>
						<td style={styles.tdata}>Items</td>
						<td style={styles.tdata}>Order date</td>
						<td style={styles.tdata}>Order status</td>
						<td style={styles.tdata}>Action(s)</td>
					</tr>
				</thead>
				{/**
                |--------------------------------------------------
                | Table body
                |--------------------------------------------------
                */}
				<tbody>
					{orders?.map((order) => (
						<tr
							key={order.order_id}
							className="hover_table"
							style={styles.body_trow}
						>
							{/**
							|--------------------------------------------------
							| Order id
							|--------------------------------------------------
							*/}
							<td style={styles.body_tdata}>{order.order_id}</td>
							{/**
							|--------------------------------------------------
							| Order items
							|--------------------------------------------------
							*/}
							<td
								style={{
									...styles.body_tdata,
									paddingInline: 0,
								}}
							>
								<div
									style={{
										display: 'flex',
										flexWrap: 'wrap',
									}}
								>
									{order.items.map((item) => (
										<span
											key={item.item_id}
											style={styles.body_tdata}
										>
											{item.item_name}
										</span>
									))}
								</div>
							</td>
							{/**
							|--------------------------------------------------
							| Created date
							|--------------------------------------------------
							*/}
							<td style={styles.body_tdata}>
								{formatDate(order?.createdAt)}
							</td>
							{/**
							|--------------------------------------------------
							| Order status
							|--------------------------------------------------
							*/}
							<td
								style={{
									...styles.body_tdata,
									textTransform: 'capitalize',
								}}
							>
								{order.order_status}
							</td>
							{/**
							|--------------------------------------------------
							| Action buttons
							|--------------------------------------------------
							*/}
							<td style={styles.body_tdata}>
								<div
									style={{
										gap: 8,
										display: 'flex',
										alignItems: 'center',
									}}
								>
									{/**
									|--------------------------------------------------
									| Trash button
									|--------------------------------------------------
									*/}
									<span
										style={{
											...styles.action,
											color: '#9c0b03',
											background: '#fc10041b',
										}}
										onClick={() =>
											handleDeleteOrder(order.order_id)
										}
									>
										<TbTrashX />
									</span>
									{/**
									|--------------------------------------------------
									| Edit button
									|--------------------------------------------------
									*/}
									<span
										onClick={() =>
											router.push(
												`/edit-order/${order.order_id}`
											)
										}
										style={{
											color: '#035c9c',
											...styles.action,
											background: '#0495fc1b',
										}}
									>
										<BiEdit />
									</span>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{(orders?.length === 0 || orders === undefined) && (
				<div style={styles.no_orders}>
					<TbDatabaseOff size={68} />

					<p
						style={{
							maxWidth: '400px',
							fontWeight: '500',
							textAlign: 'center',
							marginInline: 'auto',
						}}
					>
						You have not created an order yet. Create an order to
						see a list of orders
					</p>
				</div>
			)}
		</div>
	);
}

/**
|--------------------------------------------------
| Orders table styles
|--------------------------------------------------
*/
export const styles = {
	/**
    |--------------------------------------------------
    | Table wrapper styles
    |--------------------------------------------------
    */
	table_wrapper: {
		marginTop: '42px',
		overflowX: 'auto',
	} as React.CSSProperties,
	/**
    |--------------------------------------------------
    | Table
    |--------------------------------------------------
    */
	table: {
		overflow: 'hidden',
		borderCollapse: 'collapse',
		borderTopLeftRadius: '8px',
		borderTopRightRadius: '8px',
		marginBottom: 24,
	} as React.CSSProperties,
	/**
    |--------------------------------------------------
    | Table head
    |--------------------------------------------------
    */
	thead: {
		height: '45px',
		background: '#bbc4c642',
	} as React.CSSProperties,
	/**
    |--------------------------------------------------
    | Table head
    |--------------------------------------------------
    */
	tdata: {
		margin: 0,
		fontSize: '14px',
		fontWeight: '500',
		paddingInline: '16px',
	} as React.CSSProperties,

	/**
    |--------------------------------------------------
    | No orders
    |--------------------------------------------------
    */
	no_orders: {
		gap: '12px',
		width: '100%',
		height: '200px',
		padding: '16px',
		display: 'flex',
		marginTop: '42px',
		maxWidth: '500px',
		borderRadius: '8px',
		marginInline: 'auto',
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'center',
		background: '#bbc4c642',
	} as React.CSSProperties,

	/**
	|--------------------------------------------------
	| Table body data
	|--------------------------------------------------
	*/
	body_tdata: {
		fontSize: 14,
		paddingInline: '16px',
	} as React.CSSProperties,

	/**
	|--------------------------------------------------
	| Table body data
	|--------------------------------------------------
	*/
	body_trow: {
		height: 65,
		cursor: 'pointer',
		transition: 'background-color 0.3s ease',
	} as React.CSSProperties,

	/**
	|--------------------------------------------------
	| Action button
	|--------------------------------------------------
	*/
	action: {
		height: 40,
		width: 40,
		display: 'flex',
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},

	/**
	|--------------------------------------------------
	| Media Queries
	|--------------------------------------------------
	*/
	table_small: (state: boolean) => {
		if (state) return { width: '100%' } as React.CSSProperties;
		else return { width: '1080px' } as React.CSSProperties;
	},

	table_wrapper_small: (state: boolean) => {
		if (state) return { width: '100%' } as React.CSSProperties;
		else return { width: '90vw' } as React.CSSProperties;
	},
} as const;
