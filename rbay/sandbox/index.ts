import 'dotenv/config';
import { client } from '../src/services/redis';

const run = async () => {
  await client.hSet('car', {
    color: 'red',
    year: 1950
  })

  const car = await client.hGetAll('car')

  const car513 = await client.hGetAll('car#513') // returns {}

  const company513 = await client.get('company#513') // returns null

  console.log(car, car513, company513, Object.keys(car513).length > 0)
};
run();
