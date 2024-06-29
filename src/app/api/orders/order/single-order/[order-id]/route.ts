import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(
	_request: Request,
	context: { params: { ['order-id']: string } }
) {
	/**
	|--------------------------------------------------
	| File path
	|--------------------------------------------------
	*/
	const filePath = path.join(process.cwd(), 'data', 'orders.json');
	try {
		const order_id = context.params?.["order-id"];
		/**
		|--------------------------------------------------
		| Getting the orders from the JSON file
		|--------------------------------------------------
		*/
		const orders = await fs.promises.readFile(filePath, 'utf8');
		const _orders = JSON.parse(orders);

		/**
        |--------------------------------------------------
        | Finds the single order
        |--------------------------------------------------
        */
		const order = _orders.find(
			(_order: any) => _order.order_id === order_id
		);

		if (!order)
			return NextResponse.json(
				{ message: `Order with ${order_id} not found.` },
				{ status: 400 }
			);

		/**
		|--------------------------------------------------
		| Returns the response to the client
		|--------------------------------------------------
		*/
		return NextResponse.json({ data: order }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: 'Error getting order' },
			{ status: 400 }
		);
	}
}
