SortedSet doesn't have key and values, it has members (unique) and scores (not unique)

ZADD key score member

ZSCORE key member

ZREM key member

ZINCRBY key scoreIncrement member

SORT works with members instead scores

SORT key -> members should be type of numbers

SORT key ALPHA -> members should be type of strings

SORT key LIMIT skip take ALPHA -> skip n items and take n items