const express = require("express");
const {
  createOutSationVisit,
} = require("../controllers/outsationVisit.controller");
const router = express.Router();

router.route("/").post(createOutSationVisit);
module.exports = router;
