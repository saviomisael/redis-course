## Strings

SET message 'Hi there!'

GET message

SET color red GET

SET color green XX -> Only if the key is already created it's works

SET asdf 'hi there' NX -> It only works if the key not exists

SETNX asdf 'hi there' === SET asdf 'hi there' NX

SET color red EX 2 -> data expires after 2 seconds

Redis processes all commands synchronously - one at a time