const express = require("express");
const {
  outStationVisitSelfAssign, createOutstationVisit, updateOutstationVisit,
} = require("../controllers/outstationVisit.controller");
const router = express.Router();

router.route("/").post(createOutstationVisit);
router.route("/self").post(outStationVisitSelfAssign);
router.route("/").put(updateOutstationVisit);
module.exports = router;
