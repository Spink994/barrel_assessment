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
import { CustomerInformation, Item, Order } from '@/interfaces/order.interface';

import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
	/**
	|--------------------------------------------------
	| File path
	|--------------------------------------------------
	*/
	const filePath = path.join(process.cwd(), 'data', 'orders.json');

	try {
		/**
		|--------------------------------------------------
		| Extracting the body from the request
		|--------------------------------------------------
		*/
		const payload: {
			items: Item[];
			customer_information: CustomerInformation;
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

		/**
		|--------------------------------------------------
		| Checking if there are items in the request body
		|--------------------------------------------------
		*/
		if (
			!payload.items ||
			!Array.isArray(payload.items) ||
			payload.items.length === 0
		) {
			return NextResponse.json(
				{ message: 'Expected an array of items' },
				{ status: 400 }
			);
		}

		/**
		|--------------------------------------------------
		| Creating a new order
		|--------------------------------------------------
		*/
		const newOrder: Order = {
			...payload,
			order_status: 'pending',
			order_id: Date.now().toString(),
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		const _orders = [...JSON.parse(orders), newOrder];

		/**
		|--------------------------------------------------
		| Writes the order to file
		|--------------------------------------------------
		*/
		await fs.promises.writeFile(filePath, JSON.stringify(_orders), 'utf8');

		/**
		|--------------------------------------------------
		| Returns the response to the client
		|--------------------------------------------------
		*/
		return NextResponse.json(newOrder, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ message: 'Error creating order' },
			{ status: 400 }
		);
	}
}
