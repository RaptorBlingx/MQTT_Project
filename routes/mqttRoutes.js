const express = require('express');
const { createApplication, updateAcl } = require('../controllers/mqttController');
const router = express.Router();

router.post('/create_application', createApplication);
router.post('/update_acl', updateAcl);

module.exports = router;
