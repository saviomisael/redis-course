import { itemsByViewsKey, itemsKey } from '$services/keys';
import { client } from '$services/redis';
import { deserialize } from './deserialize';

export const itemsByViews = async (order: 'DESC' | 'ASC' = 'DESC', offset = 0, count = 10) => {
	let results: any = await client.sort(itemsByViewsKey(), {
		GET: [
			'#',
			`${itemsKey('*')}->name`,
			`${itemsKey('*')}->views`,
			`${itemsKey('*')}->endingAt`,
			`${itemsKey('*')}->imageUrl`,
			`${itemsKey('*')}->price`
		],
		BY: 'score',
		DIRECTION: order,
		LIMIT: {
			offset,
			count
		}
	});

	const items = [];

	while (results.length) {
		const [id, name, views, endingAt, price, ...rest] = results;
		const item = deserialize(id, { name, views, endingAt, price });
		items.push(item);

		results = rest;
	}

	return items;
};
