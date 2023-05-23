A Set is a **collection of strings** where each string is unique

SADD key value -> add values

SMEMBERS key -> get all values

SISMEMBER key value -> checks if a value exist in a Set

SCARD key -> how much items exists on a Set

SREM key value -> removes a value from a Set

## Set Use Cases
- Enforcing uniqueness of any value
- Creating a relationship between different records
- Finding common attributes between different things
- General list of elements where order doesn't matter