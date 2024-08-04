const { Pool } = require('pg');

const pool = new Pool({
  user: 'mqtt_user',
  host: 'localhost',
  database: 'mqtt',
  password: 'raptorblingx',
  port: 5432,
});

module.exports = pool;
