const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/submit-form', contactController.submitContact);

module.exports = router; 