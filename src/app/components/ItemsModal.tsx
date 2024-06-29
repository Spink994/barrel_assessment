'use client';
/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import Image from 'next/image';
import { IoCloseCircleOutline } from 'react-icons/io5';
/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import Button from './Button';
import Loader from './Loader';
import { Item } from '@/interfaces/order.interface';
import { getItems } from '@/services/userServices';

interface Props {
	visible: boolean;
	selectedItems: Item[];
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
	setSelectedItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

export default function ItemsModal({
	visible,
	setVisible,
	selectedItems,
	setSelectedItems,
}: Props) {
	const [items, setItems] = React.useState<Item[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	/**
	|--------------------------------------------------
	| Handles fetching the items
	|--------------------------------------------------
	*/
	const handleFetchItems = async () => {
		try {
			setIsLoading(true);
			/**
			|--------------------------------------------------
			| api call to get items
			|--------------------------------------------------
			*/
			const response = await getItems();
			setItems(response.data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	/**
    |--------------------------------------------------
    | Handles selection of items
    |--------------------------------------------------
    */
	const handleSelectItems = (item: Item) => {
		/**
        |--------------------------------------------------
        | Check if item exists in selection
        |--------------------------------------------------
        */
		const is_item_selected = selectedItems.find(
			(_item) => _item.item_id === item.item_id
		);
		/**
        |--------------------------------------------------
        | If item exists in selection, it is removed
        |--------------------------------------------------
        */
		if (is_item_selected)
			setSelectedItems(() =>
				selectedItems.filter((_item) => _item.item_id !== item.item_id)
			);
		/**
        |--------------------------------------------------
        | If item is not in selection, it is added
        |--------------------------------------------------
        */ else setSelectedItems(() => [...selectedItems, item]);
	};

	React.useEffect(() => {
		handleFetchItems();
	}, []);
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return !visible ? null : (
		<div style={styles.items_wrapper}>
			{isLoading ? (
				<Loader />
			) : (
				<React.Fragment>
					{/**
					|--------------------------------------------------
					| Modal Content
					|--------------------------------------------------
					*/}
					<div style={styles.content}>
						{/**
						|--------------------------------------------------
						| Header
						|--------------------------------------------------
						*/}
						<div style={styles.header}>
							<h1 style={{ lineHeight: 0.8 }}>Select items</h1>
							<IoCloseCircleOutline
								size={24}
								onClick={() => setVisible(false)}
							/>
						</div>
						{/**
						|--------------------------------------------------
						| Content
						|--------------------------------------------------
						*/}
						<div style={styles.items_container}>
							{items?.map((item) => {
								/**
								|--------------------------------------------------
								| Checking if the item has been selected
								|--------------------------------------------------
								*/
								const is_item_active = selectedItems.find(
									(_item) => _item.item_id === item.item_id
								);

								return (
									<Button
										key={item.item_id}
										onClick={() => handleSelectItems(item)}
										style={{
											...styles.item,
											...styles.active(
												is_item_active !== undefined
											),
										}}
									>
										<img
											width={300}
											height={200}
											alt={item.item_name}
											src={item.item_image_url}
											style={{
												objectFit: 'contain',
												minWidth: '100%',
											}}
										/>

										<div style={styles.item_info}>
											<span style={styles.item_name}>
												{item.item_name}
											</span>
											<span style={styles.item_price}>
												${item.price}
											</span>
										</div>
									</Button>
								);
							})}
						</div>
					</div>
				</React.Fragment>
			)}
		</div>
	);
}

/**
|--------------------------------------------------
| Items modal styles
|--------------------------------------------------
*/
const styles = {
	/**
    |--------------------------------------------------
    | Items wrapper
    |--------------------------------------------------
    */
	items_wrapper: {
		top: 0,
		left: 0,
		zIndex: 999,
		width: '100vw',
		height: '100vh',
		display: 'flex',
		position: 'fixed',
		alignItems: 'center',
		justifyContent: 'center',
		background: '#b4b4b42c',
		backdropFilter: 'blur(3px)',
	} as React.CSSProperties,
	/**
    |--------------------------------------------------
    | Modal content
    |--------------------------------------------------
    */
	content: {
		padding: 12,
		minHeight: 200,
		height: 'auto',
		width: '800px',
		borderRadius: 12,
		background: 'white',
	} as React.CSSProperties,
	/**
    |--------------------------------------------------
    | Header content
    |--------------------------------------------------
    */
	header: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	} as React.CSSProperties,
	/**
    |--------------------------------------------------
    | Item content container
    |--------------------------------------------------
    */
	items_container: {
		gap: 16,
		marginTop: 24,
		maxHeight: 670,
		display: 'grid',
		paddingRight: 12,
		overflowY: 'auto',
		gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
	} as React.CSSProperties,
	/**
    |--------------------------------------------------
    | item
    |--------------------------------------------------
    */
	item: {
		padding: 0,
		height: 290,
		minHeight: 200,
		borderRadius: 8,
		overflow: 'hidden',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		background: 'transparent',
		border: '0.5px solid rgba(0,0,0,0.3)',
	} as React.CSSProperties,
	/**
    |--------------------------------------------------
    | Item information
    |--------------------------------------------------
    */
	item_info: {
		paddingTop: 16,
		paddingLeft: 24,
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
	} as React.CSSProperties,

	/**
    |--------------------------------------------------
    | Item name
    |--------------------------------------------------
    */
	item_name: {
		fontSize: 14,
		marginBottom: 6,
		fontWeight: '500',
		textAlign: 'start',
	} as React.CSSProperties,
	/**
    |--------------------------------------------------
    | Item name
    |--------------------------------------------------
    */
	item_price: {
		fontSize: 18,
		fontWeight: '700',
	} as React.CSSProperties,
	/**
	|--------------------------------------------------
	| selected item
	|--------------------------------------------------
	*/
	active: (state: boolean) => {
		if (state)
			return {
				border: '2px solid #9ac0fa9a',
			} as React.CSSProperties;
		else return undefined;
	},
} as const;
