export interface Item {
	price: number;
	item_id: string;
	quantity: number;
	item_name: string;
	item_image_url: string;
}

export interface CustomerInformation {
	email: string;
	last_name: string;
	first_name: string;
	phone_number: string;
}

export interface Order {
	items: Item[];
	order_id: string;
	createdAt: string;
	updatedAt: string;
	customer_information: CustomerInformation;
	order_status: 'pending' | 'in_progress' | 'cancelled' | 'completed';
}
