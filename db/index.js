const { Pool, Client } = require('pg');
require('dotenv').config();

const {
  DATABASE_NAME,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_URL
} = process.env

let client;
if(DATABASE_URL) {
  client = new Pool({
    connectionString: DATABASE_URL,
    ssl: true
  });
}
else {
  client = new Client({
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    database: DATABASE_NAME,
    ssl: true
  });
  client.connect().then(x => console.log('Database connected.'))
    .catch(e => console.error(e));
}
module.exports = async function _query(query, values) {
  var result = await client.query({
      rowMode: 'array',
      text: query,
      values
  });
  return result.rows
}