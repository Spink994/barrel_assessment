/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import { Order } from '@/interfaces/order.interface';

export async function DELETE(
	_request: Request,
	context: { params: { order_id: string } }
) {
	/**
	|--------------------------------------------------
	| File path
	|--------------------------------------------------
	*/
	const filePath = path.join(process.cwd(), 'data', 'orders.json');
	try {
		const order_id = context.params.order_id;
		/**
        |--------------------------------------------------
        | Checking if the order id is present
        |--------------------------------------------------
        */
		if (!order_id)
			return NextResponse.json(
				{ message: 'Order id is missing in request' },
				{ status: 400 }
			);

		/**
		|--------------------------------------------------
		| Getting the orders from the JSON file
		|--------------------------------------------------
		*/
		const orders = await fs.promises.readFile(filePath, 'utf8');
		const _orders: Order[] = [...JSON.parse(orders)];

		const order = _orders.find((order) => order.order_id === order_id);

		if (!order)
			return NextResponse.json(
				{ message: 'Order not found' },
				{ status: 400 }
			);
		/**
        |--------------------------------------------------
        | Remove order
        |--------------------------------------------------
        */
		const _updated_order = [
			..._orders.filter((order) => order.order_id !== order_id),
		];

		/**
		|--------------------------------------------------
		| Writes the updated order to file
		|--------------------------------------------------
		*/
		try {
			await fs.promises.writeFile(
				filePath,
				JSON.stringify(_updated_order),
				'utf8'
			);
		} catch (error) {
			return NextResponse.json(
				{ message: 'Error writing to file' },
				{ status: 400 }
			);
		}
		/**
        |--------------------------------------------------
        | Returns response to the client
        |--------------------------------------------------
        */
		return NextResponse.json(
			{ data: { message: 'Order deleted successfully' } },
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ message: 'Error deleting order' },
			{ status: 400 }
		);
	}
}
