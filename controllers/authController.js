const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create(username, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register };
