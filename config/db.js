const { Pool } = require('pg');

const pool = new Pool({
  user: 'mqtt_user',
  host: 'localhost',
  database: 'mqtt',
  password: 'Your_Password',
  port: 5432,
});

module.exports = pool;
