/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/

import { NextResponse } from 'next/server';
/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/

import fs from 'fs';
import path from 'path';

export async function PUT(
	request: Request,
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
		| Extracting the body from the request
		|--------------------------------------------------
		*/
		const payload: {
			order_status: string;
		} = await request.json();
		/**
		|--------------------------------------------------
		| Makes sure the file has been created
		|--------------------------------------------------
		*/
		fs.mkdirSync(path.dirname(filePath), { recursive: true });
		/**
		|--------------------------------------------------
		| Getting the orders from the JSON file
		|--------------------------------------------------
		*/
		const orders = await fs.promises.readFile(filePath, 'utf8');
		const _orders = [...JSON.parse(orders)];
		/**
        |--------------------------------------------------
        | Finding the order to be updated
        |--------------------------------------------------
        */
		const order_to_be_updated = _orders.find(
			(_order) => _order.order_id === order_id
		);

		/**
		|--------------------------------------------------
		| Updating the order
		|--------------------------------------------------
		*/
		const _updated_order: any = {
			...order_to_be_updated,
			order_status: payload.order_status,
			updatedAt: new Date().toISOString(),
		};
		/**
        |--------------------------------------------------
        | Updating the orders
        |--------------------------------------------------
        */
		const updated_orders = _orders.map((order) =>
			order.order_id === order_id ? _updated_order : order
		);

		/**
		|--------------------------------------------------
		| Writing the updated orders to file
		|--------------------------------------------------
		*/
		await fs.promises.writeFile(
			filePath,
			JSON.stringify(updated_orders),
			'utf8'
		);

		/**
		|--------------------------------------------------
		| Returns the response to the client
		|--------------------------------------------------
		*/
		return NextResponse.json(_updated_order, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ message: 'Error creating order' },
			{ status: 400 }
		);
	}
}
