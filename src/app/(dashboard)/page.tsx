'use client';
import Overview from './_features/Overview';
import OrdersTable from './_features/OrdersTable';
import CreateOrder from './_features/CreateOrder';
import { Order } from '@/interfaces/order.interface';
import React from 'react';
import { getOrders } from '@/services/userServices';
import Loader from '../components/Loader';

export default function Home() {
	/**
	|--------------------------------------------------
	| Component's States
	|--------------------------------------------------
	*/
	const [orders, setOrders] = React.useState<Order[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	/**
	|--------------------------------------------------
	| Gets all the orders
	|--------------------------------------------------
	*/
	const handleGetOrders = async () => {
		try {
			setIsLoading(true);
			const response = await getOrders();
			setOrders(response.data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		handleGetOrders();
	}, []);
	/**
	|--------------------------------------------------
	| Rendered View
	|--------------------------------------------------
	*/
	return isLoading ? (
		<Loader />
	) : (
		<section style={styles.section}>
			{/**
			|--------------------------------------------------
			| Overview
			|--------------------------------------------------
			*/}
			<Overview orders={orders} />
			{/**
			|--------------------------------------------------
			| Create Order Button
			|--------------------------------------------------
			*/}
			<CreateOrder />
			{/**
			|--------------------------------------------------
			| Orders Table
			|--------------------------------------------------
			*/}
			<OrdersTable orders={orders} />
		</section>
	);
}

export const styles = {
	/**
    |--------------------------------------------------
    | Section styles
    |--------------------------------------------------
    */
	section: {
		width: '100%',
		padding: '24px',
		overflowY: 'auto',
	} as React.CSSProperties,
} as const;

// {} as React.CSSProperties
