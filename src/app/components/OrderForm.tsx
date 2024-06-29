'use client';
/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { useRouter } from 'next/navigation';
import { Montserrat } from 'next/font/google';
/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import Button from './Button';
import ItemsModal from './ItemsModal';
import { createOrder, updateOrder } from '@/services/userServices';
import { validateFormField } from '@/hooks/useHandleFormErrors';
import { CustomerInformation, Item, Order } from '@/interfaces/order.interface';
import OrderStatus from './OrderStatus';

const monteserrat = Montserrat({ subsets: ['latin'] });

interface Props {
	order?: Order;
}

/**
|--------------------------------------------------
| This form can be use to create and edit an order
|--------------------------------------------------
| When it is used for creating an order the values
| of the input fields would be empty, but when used
| for editing, the form fields will be pre-filled
| with values.
*/
export default function OrderForm({ order }: Props) {
	const router = useRouter();
	/**
	|--------------------------------------------------
	| Forms default state
	|--------------------------------------------------
	*/
	const default_state: CustomerInformation = {
		email: order?.customer_information?.email ?? '',
		last_name: order?.customer_information?.last_name ?? '',
		first_name: order?.customer_information?.first_name ?? '',
		phone_number: order?.customer_information?.phone_number ?? '',
	};
	/**
    |--------------------------------------------------
    | Component's states
    |--------------------------------------------------
    */
	const [orderStatus, setOrderStatus] = React.useState<string>(
		order?.order_status ?? ''
	);
	const [userData, setUserData] =
		React.useState<CustomerInformation>(default_state);
	const [errors, setErrors] = React.useState<any>(null);
	const [isLoading, setisLoading] = React.useState<boolean>(false);
	const [selectedItems, setSelectedItems] = React.useState<Item[]>(
		order?.items ?? []
	);
	const [showItemsModal, setShowItemsModal] = React.useState<boolean>(false);

	/**
	|--------------------------------------------------
	| Handles the input change for the form fields
	|--------------------------------------------------
	*/
	const handleInputChange = (
		value: string,
		name: keyof typeof default_state
	) => {
		setUserData((previousData) => ({ ...previousData, [name]: value }));
	};

	/**
	|--------------------------------------------------
	| Handles form submission
	|--------------------------------------------------
	*/
	const handleFormSubmission = async () => {
		try {
			const error = await validateFormField(userData);
			setErrors(error.errors);
			if (!error.isValid) return;

			setisLoading(true);
			/**
			|--------------------------------------------------
			| api call to create/update an order
			|--------------------------------------------------
			*/
			if (!order?.order_status)
				await createOrder({
					items: selectedItems,
					customer_information: userData,
				});
			else
				await updateOrder({
					order_status:
						orderStatus === 'In progress'
							? 'in_progress'
							: orderStatus.toLowerCase(),
					order_id: order?.order_id as string,
				});

			router.push('/');
		} catch (error) {
			console.log(error);
		} finally {
			setisLoading(false);
		}
	};

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<div style={styles.wrapper}>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					handleFormSubmission();
				}}
				style={styles.form}
			>
				{/**
				|--------------------------------------------------
				| First name
				|--------------------------------------------------
				*/}
				<div style={styles.input_wrapper}>
					<span style={styles.label}>First Name</span>
					<input
						type="text"
						name="first_name"
						placeholder="John"
						style={styles.input_field}
						value={userData?.first_name}
						className={monteserrat.className}
						onChange={(event) => {
							handleInputChange(event.target.value, 'first_name');
						}}
					/>
					{errors?.first_name && (
						<span style={styles.invalid}>{errors?.first_name}</span>
					)}
				</div>
				{/**
				|--------------------------------------------------
				| Last name
				|--------------------------------------------------
				*/}
				<div style={styles.input_wrapper}>
					<span style={styles.label}>Last Name</span>
					<input
						type="text"
						name="last_name"
						placeholder="Doe"
						style={styles.input_field}
						value={userData?.last_name}
						className={monteserrat.className}
						onChange={(event) => {
							handleInputChange(event.target.value, 'last_name');
						}}
					/>
					{errors?.last_name && (
						<span style={styles.invalid}>{errors?.last_name}</span>
					)}
				</div>
				{/**
				|--------------------------------------------------
				| Email
				|--------------------------------------------------
				*/}
				<div style={styles.input_wrapper}>
					<span style={styles.label}>Email</span>
					<input
						type="text"
						name="email"
						value={userData?.email}
						style={styles.input_field}
						placeholder="example@ex.com"
						className={monteserrat.className}
						onChange={(event) => {
							handleInputChange(event.target.value, 'email');
						}}
					/>
					{errors?.email && (
						<span style={styles.invalid}>{errors?.email}</span>
					)}
				</div>
				{/**
				|--------------------------------------------------
				| Phone number
				|--------------------------------------------------
				*/}
				<div style={styles.input_wrapper}>
					<span style={styles.label}>Phone number</span>
					<input
						type="text"
						name="phone_number"
						placeholder="08121052551"
						style={styles.input_field}
						value={userData?.phone_number}
						className={monteserrat.className}
						onChange={(event) => {
							handleInputChange(
								event.target.value,
								'phone_number'
							);
						}}
					/>
					{errors?.phone_number && (
						<span style={styles.invalid}>
							{errors?.phone_number}
						</span>
					)}
				</div>

				{/**
				|--------------------------------------------------
				| Order status
				|--------------------------------------------------
				*/}
				{order?.order_status && (
					<OrderStatus
						status={orderStatus}
						setStatus={setOrderStatus}
					/>
				)}

				{/**
				|--------------------------------------------------
				| Selected items
				|--------------------------------------------------
				*/}
				<div style={styles.selected_items_container}>
					{selectedItems.map((_item) => (
						<Button key={_item.item_id}>{_item.item_name}</Button>
					))}
				</div>
				{/**
                |--------------------------------------------------
                | Items
                |--------------------------------------------------
                */}
				<div>
					<span style={styles.item_title}>
						Select one or more <br /> items you would like to add to
						this order
					</span>
					<Button
						style={styles.item_button}
						onClick={() => setShowItemsModal(true)}
					>
						Select Items
					</Button>
				</div>
				{/**
				|--------------------------------------------------
				| Submit Button
				|--------------------------------------------------
				*/}
				<Button
					type="submit"
					disabled={isLoading}
					isLoading={isLoading}
					style={styles.submit_button}
				>
					{order?.order_status ? 'Update Order' : 'Create Order'}
				</Button>
			</form>

			{/**
			|--------------------------------------------------
			| Items modal
			|--------------------------------------------------
			*/}
			{showItemsModal && (
				<ItemsModal
					visible={showItemsModal}
					selectedItems={selectedItems}
					setVisible={setShowItemsModal}
					setSelectedItems={setSelectedItems}
				/>
			)}
		</div>
	);
}

/**
|--------------------------------------------------
| Order form styles
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
	} as React.CSSProperties,
	/**
	|--------------------------------------------------
	| Form styles
	|--------------------------------------------------
	*/
	form: {
		gap: 24,
		display: 'flex',
		flexDirection: 'column',
	} as React.CSSProperties,
	/**
	|--------------------------------------------------
	| Input wrapper
	|--------------------------------------------------
	*/
	input_wrapper: {
		display: 'flex',
		flexDirection: 'column',
	} as React.CSSProperties,
	/**
	|--------------------------------------------------
	| Input field styles
	|--------------------------------------------------
	*/
	input_field: {
		height: 50,
		fontSize: 14,
		borderRadius: 8,
		outline: 'none',
		paddingInline: 12,
		background: '#9ac0fa1b',
		border: '0.5px solid #9ac0fa9a',
	} as React.CSSProperties,
	/**
	|--------------------------------------------------
	| Input field label
	|--------------------------------------------------
	*/
	label: {
		fontSize: 14,
		marginBottom: 10,
		fontWeight: '400',
	} as React.CSSProperties,
	/**
	|--------------------------------------------------
	| Submit button
	|--------------------------------------------------
	*/
	submit_button: {
		width: 160,
		marginTop: 24,
		fontWeight: '500',
		marginBottom: 80,
		marginInline: 'auto',
	} as React.CSSProperties,
	/**
	|--------------------------------------------------
	| items title
	|--------------------------------------------------
	*/
	item_title: {
		fontSize: 14,
		display: 'flex',
		lineHeight: 1.4,
	} as React.CSSProperties,

	/**
	|--------------------------------------------------
	| Item button
	|--------------------------------------------------
	*/
	item_button: {
		marginTop: 6,
		width: '100%',
		fontWeight: '500',
	} as React.CSSProperties,
	/**
	|--------------------------------------------------
	| Selected items
	|--------------------------------------------------
	*/
	selected_items_container: {
		gap: 16,
		marginTop: 24,
		maxHeight: 670,
		display: 'grid',
		paddingRight: 12,
		overflowY: 'auto',
		gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
	} as React.CSSProperties,
	/**
	|--------------------------------------------------
	| Invalid input field
	|--------------------------------------------------
	*/
	invalid: {
		color: 'red',
		fontSize: 12,
		textTransform: 'capitalize',
	} as React.CSSProperties,
} as const;
