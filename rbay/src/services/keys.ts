export const pageCacheKey = (id: string) => 'pagecache#' + id;

export const usersKey = (userId: string) => `users#${userId}`;

export const sessionsKey = (sessionId: string) => `sessions#${sessionId}`;

export const usernamesUniqueKey = () => `usernames:unique`;

export const userLikeKey = (userId: string) => `user:likes#${userId}`;

export const usernamesKey = () => 'usernames';

export const itemsKey = (itemId: string) => `items#${itemId}`;

export const itemsByViewsKey = () => 'items:views';

export const itemsByEndingAtKey = () => 'items:endingAt';
