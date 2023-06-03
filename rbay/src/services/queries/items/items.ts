import { itemsByEndingAtKey, itemsByPriceKey, itemsByViewsKey, itemsKey } from '$services/keys';
import { client } from '$services/redis';
import type { CreateItemAttrs } from '$services/types';
import { genId } from '$services/utils';
import { deserialize } from './deserialize';
import { serialize } from './serialize';

export const getItem = async (id: string) => {
	const item = await client.hGetAll(itemsKey(id));

	if (Object.keys(item).length < 1) return null;

	return deserialize(id, item);
};

export const getItems = async (ids: string[]) => {
	const commands = ids.map((x) => client.hGetAll(itemsKey(x)));

	const results = await Promise.all(commands);

	const items = results
		.map((x, index) => {
			if (Object.keys(x).length === 0) return null;

			return deserialize(ids[index], x);
		})
		.filter((x) => x != null);

	return items;
};

export const createItem = async (attrs: CreateItemAttrs, userId: string) => {
	const id = genId();

	const serialized = serialize(attrs);

	await Promise.all([
		client.hSet(itemsKey(id), serialized),
		client.zAdd(itemsByViewsKey(), {
			value: id,
			score: 0
		}),
		client.zAdd(itemsByEndingAtKey(), {
			value: id,
			score: attrs.endingAt.toMillis()
		}),
		client.zAdd(itemsByPriceKey(), {
			value: id,
			score: 0
		})
	]);

	return id;
};
