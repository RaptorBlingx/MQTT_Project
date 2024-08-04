const express = require('express');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const mqttRoutes = require('./routes/mqttRoutes');

const app = express();
app.use(express.json());
app.use(morgan('combined'));

app.use('/auth', authRoutes);
app.use('/mqtt', mqttRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
