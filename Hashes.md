Hashes doesn't support nested objects

HSET hash key value key value

HGET hash key

HGETALL hash

DEL hash

HDEL hash key

## Reasons to Store as Hash
- The record has many attributes
- A collection of these records have to be sorted many different ways
- Often need to access a single record at a time

## Don't Use Hashes When
- The record is only for counting or enforcing uniqueness
- Record stores only one or two attributes
- Used only for creating relations between different records
- The record is only used for time series data