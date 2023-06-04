import { itemsIndexKey, itemsKey } from '$services/keys';
import { SchemaFieldTypes } from 'redis';
import { client } from './client';

export const createIndexes = async () => {
	const indexes = await client.ft._list();

	const exists = indexes.find((x) => x === itemsIndexKey());

	if (exists) return;

	return client.ft.create(
		itemsIndexKey(),
		{
			name: {
				type: SchemaFieldTypes.TEXT,
				sortable: true
			},
			description: {
				type: SchemaFieldTypes.TEXT,
				sortable: false
			},
			ownerId: {
				type: SchemaFieldTypes.TAG,
				sortable: false
			},
			endingAt: {
				type: SchemaFieldTypes.NUMERIC,
				sortable: true
			},
			bids: {
				type: SchemaFieldTypes.TEXT,
				sortable: true
			},
			views: {
				type: SchemaFieldTypes.TEXT,
				sortable: true
			},
			price: {
				type: SchemaFieldTypes.TEXT,
				sortable: true
			},
			likes: {
				type: SchemaFieldTypes.TEXT,
				sortable: true
			}
		} as any,
		{
			ON: 'HASH',
			PREFIX: itemsKey('')
		}
	);
};
