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
import { wait } from '../_helper/wait';
import _ITEMS_DATA from '@/data/items.json';

export async function GET(_request: Request) {
	try {
		wait();

		/**
        |--------------------------------------------------
        | Returns the items
        |--------------------------------------------------
        */
		return NextResponse.json({ data: _ITEMS_DATA }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: 'Error fetching items' },
			{ status: 400 }
		);
	}
}
