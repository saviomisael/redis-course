import { itemsKey, userLikeKey } from '$services/keys';
import { client } from '$services/redis';
import { getItems } from './items';

export const userLikesItem = async (itemId: string, userId: string) => {
	return await client.sIsMember(userLikeKey(userId), itemId);
};

export const likedItems = async (userId: string) => {
	const ids = await client.sMembers(userLikeKey(userId));

	return getItems(ids);
};

export const likeItem = async (itemId: string, userId: string) => {
	const inserted = await client.sAdd(userLikeKey(userId), itemId);

	if (inserted) {
		return client.hIncrBy(itemsKey(itemId), 'likes', 1);
	}
};

export const unlikeItem = async (itemId: string, userId: string) => {
	const removed = await client.sRem(userLikeKey(userId), itemId);

	if (removed) {
		return client.hIncrBy(itemsKey(itemId), 'likes', -1);
	}
};

export const commonLikedItems = async (userOneId: string, userTwoId: string) => {
	const ids = await client.sInter([userLikeKey(userOneId), userLikeKey(userTwoId)]);

	return getItems(ids);
};
