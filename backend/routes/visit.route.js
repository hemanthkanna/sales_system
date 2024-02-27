const express = require("express");
const { createVisit } = require("../controllers/visit.controller");
const router = express.Router();

router.route("/").post(createVisit);

module.exports = router;
