import axiosInstance from '@/libs/axiosInstance';
import { CustomerInformation, Item } from '@/interfaces/order.interface';

/**
|--------------------------------------------------
| Gets all the orders from the api
|--------------------------------------------------
*/
export const getOrders = async () => axiosInstance.get('/orders');

/**
|--------------------------------------------------
| Gets a single order from the api
|--------------------------------------------------
*/
export const getSingleOrder = async (order_id: string) =>
	axiosInstance.get(`/orders/order/single-order/${order_id}`);
/**
|--------------------------------------------------
| Creates an order
|--------------------------------------------------
*/
export const createOrder = async (payload: {
	items: Item[];
	customer_information: CustomerInformation;
}) => axiosInstance.post('/orders/order', payload);
/**
|--------------------------------------------------
| Updates an order
|--------------------------------------------------
*/
export const updateOrder = async (payload: {
	order_status: string;
	order_id: string;
}) =>
	axiosInstance.put(`/orders/order/update-order/${payload.order_id}`, {
		order_status: payload.order_status,
	});
/**
|--------------------------------------------------
| Deletes an order
|--------------------------------------------------
*/
export const deleteOrder = async (order_id: string) =>
	axiosInstance.delete(`/orders/order/delete-order/${order_id}`);
/**
|--------------------------------------------------
| Gets the items from the api
|--------------------------------------------------
*/
export const getItems = async () => axiosInstance.get('/items');
