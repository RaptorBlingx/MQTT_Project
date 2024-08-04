const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const Application = {
  create: async (userId, appName) => {
    const mqttUsername = Math.random().toString(36).substring(2, 12);
    const mqttPassword = Math.random().toString(36).substring(2, 12);
    const hashedPassword = await bcrypt.hash(mqttPassword, 10);
    const result = await pool.query(
      'INSERT INTO applications (user_id, app_name, mqtt_username, mqtt_password) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, appName, mqttUsername, hashedPassword]
    );
    return { ...result.rows[0], mqttPassword };
  },
  findById: async (id) => {
    const result = await pool.query(
      'SELECT * FROM applications WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }
};

module.exports = Application;
