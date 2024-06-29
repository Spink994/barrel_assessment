import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(_request: Request) {
	/**
	|--------------------------------------------------
	| File path
	|--------------------------------------------------
	*/
	const filePath = path.join(process.cwd(), 'data', 'orders.json');
	try {
		/**
		|--------------------------------------------------
		| Getting the orders from the JSON file
		|--------------------------------------------------
		*/
		const orders = await fs.promises.readFile(filePath, 'utf8');
		const _orders = JSON.parse(orders);

		/**
		|--------------------------------------------------
		| Returns the response to the client
		|--------------------------------------------------
		*/
		return NextResponse.json({ data: _orders }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: 'Error getting order' },
			{ status: 400 }
		);
	}
}
