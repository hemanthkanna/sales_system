const express = require('express');
const { createClient } = require('../controllers/client.controller');
const router = express.Router();

router.route("/").post(createClient);
module.exports = router;
