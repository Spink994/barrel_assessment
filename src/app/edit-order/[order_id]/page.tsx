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
import OrderForm from '../../components/OrderForm';
import { Order } from '@/interfaces/order.interface';
import { getSingleOrder } from '@/services/userServices';
import Loader from '@/app/components/Loader';

export default function EditOrder({
	params,
}: {
	params: { order_id: string };
}) {
	/**
	|--------------------------------------------------
	| Component states
	|--------------------------------------------------
	*/
	const [order, setOrder] = React.useState<Order | null>(null);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	/**
	|--------------------------------------------------
	| Fetches the order details
	|--------------------------------------------------
	*/
	const handleGetSingleOrder = async () => {
		try {
			setIsLoading(true);
			/**
			|--------------------------------------------------
			| api call to fetch the order
			|--------------------------------------------------
			*/
			const response = await getSingleOrder(params.order_id);
			setOrder(response.data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		handleGetSingleOrder();
	}, []);
	/**
	|--------------------------------------------------
	| Rendered View
	|--------------------------------------------------
	*/
	return isLoading ? (
		<Loader />
	) : (
		<div style={styles.wrapper}>
			<h1 style={styles.header}>Edit Order</h1>
			{/**
            |--------------------------------------------------
            | Order form
            |--------------------------------------------------
            */}
			<OrderForm order={order as Order} />
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
		overflowY: 'auto',
		maxWidth: '800px',
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
