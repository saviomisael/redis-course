import { bidHistoryKey, itemsByPriceKey, itemsKey } from '$services/keys';
import { client, withLock } from '$services/redis';
import type { Bid, CreateBidAttrs } from '$services/types';
import { DateTime } from 'luxon';
import { getItem } from './items';

export const createBid = async (attrs: CreateBidAttrs) => {
	return withLock(attrs.itemId, async (lockedClient, signal) => {
		const item = await getItem(attrs.itemId);

		if (!item) {
			throw new Error('Item does not exist.');
		}

		if (item.price >= attrs.amount) {
			throw new Error('Bid too low.');
		}

		if (item.endingAt.diff(DateTime.now()).toMillis() < 0) {
			throw new Error('Item closed to bidding.');
		}

		const serialized = serializeHistory(attrs.amount, attrs.createdAt.toMillis());

		// if (signal.expired) {
		// 	throw new Error("Lock expired, can't write any more data.");
		// }

		return Promise.all([
			lockedClient.rPush(bidHistoryKey(attrs.itemId), serialized),
			lockedClient.hSet(itemsKey(item.id), {
				bids: item.bids + 1,
				price: attrs.amount,
				highestBidUserId: attrs.userId
			}),
			lockedClient.zAdd(itemsByPriceKey(), { value: item.id, score: attrs.amount })
		]);
	});
};

export const getBidHistory = async (itemId: string, offset = 0, count = 10): Promise<Bid[]> => {
	const startIndex = -1 * offset - count;
	const endIndex = -1 - offset;

	const range = await client.lRange(bidHistoryKey(itemId), startIndex, endIndex);

	return range.map((x) => deserializeHistory(x));
};

const serializeHistory = (amountMoney: number, createdAt: number) => {
	return `${amountMoney}: ${createdAt}`;
};

const deserializeHistory = (stored: string) => {
	const [amount, createdAt] = stored.split(':');

	return { amount: parseFloat(amount), createdAt: DateTime.fromMillis(parseInt(createdAt)) };
};
