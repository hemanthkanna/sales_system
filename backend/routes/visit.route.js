const express = require("express");
const { createVisit, updateVisit, visitSelfAssign} = require("../controllers/visit.controller");
const router = express.Router();

router.route("/").post(createVisit);
router.route("/self").post(visitSelfAssign);
router.route("/").put(updateVisit);

module.exports = router;
