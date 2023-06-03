When to use Lua Scripts
- Limiting the amount of data exchanged between server + redis
- Solving some concurrency issues
- Minimizing the number of round trips between server + redis

Script Down Sides
- Keys must be known ahead of time (EVALSHA)
- Tough to test scripts
- Loss of language features (E.g. type checking with Typescript)
- Another language to deal with (Lua)