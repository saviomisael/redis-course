import { itemsIndexKey } from '$services/keys';
import { client } from '$services/redis';
import { deserialize } from './deserialize';

export const searchItems = async (term: string, size: number = 5) => {
	const cleaned = term
		.replaceAll(/[^a-zA-Z0-9 ]/g, '')
		.trim()
		.split(' ')
		.map((x) => (x ? `%${x}%` : ''))
		.join(' ');

	if (cleaned == '') return [];

	const query = `(@name:(${cleaned}) => { $weight: 5.0; }) | (@description:(${cleaned}))`;

	console.log(query);

	const results = await client.ft.search(itemsIndexKey(), query, {
		LIMIT: {
			from: 0,
			size
		}
	});

	return results.documents.map(({ id, value }) => deserialize(id, value as any));
};
