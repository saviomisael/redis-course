import { itemsByEndingAtKey, itemsKey } from '$services/keys';
import { client } from '$services/redis';
import { deserialize } from './deserialize';

export const itemsByEndingTime = async (order: 'DESC' | 'ASC' = 'DESC', offset = 0, count = 10) => {
	const ids = await client.zRange(itemsByEndingAtKey(), Date.now(), '+inf', {
		BY: 'SCORE',
		LIMIT: {
			offset,
			count
		}
	});

	const items = await Promise.all([...ids.map((x) => client.hGetAll(itemsKey(x)))]);

	return items.map((x, index) => deserialize(ids[index], x));
};
