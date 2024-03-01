const Client = require("../model/client.model");
const OutstationVisit = require("../model/outstationVisit.model");
const User = require("../model/user.model");

exports.createOutstationVisit = async (req, res) => {
  try {
    const { userId, clientId } = req.body;

    const user = await User.findByPk(userId);
    const client = await Client.findByPk(clientId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    const outstationVisit = await OutstationVisit.create({
      userId,
      clientId,
    });

    // Assign the outstation visit to the user
    await user.addOutstationVisit(outstationVisit);

    res.status(200).json({
      success: true,
      outstationVisitId: outstationVisit.outstationVisitId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

exports.outStationVisitSelfAssign = async (req, res) => {
  try {
    const {
      userId,
      clientId,
      start,
      stop,
      distance,
      status,
      remark,
      travelAllowance,
      foodAllowance,
      accomidation,
    } = req.body;

    const user = await User.findByPk(userId);
    const client = await Client.findByPk(clientId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    const outstationVisit = await OutstationVisit.create({
      userId,
      clientId,
      start,
      stop,
      distance,
      status,
      remark,
      foodAllowance,
      travelAllowance,
      accomidation,
    });

    res.status(200).json({
      success: true,
      outstationVisit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

exports.updateOutstationVisit = async (req, res) => {
  try {
    const {
      outstationVisitId,
      start,
      stop,
      distance,
      status,
      remark,
      travelAllowance,
      foodAllowance,
      accommodation,
    } = req.body;

    // Fetch the outstation visit
    const outstationVisit = await OutstationVisit.findByPk(outstationVisitId);

    if (!outstationVisit) {
      return res.status(404).json({ error: "Outstation visit not found" });
    }

    // Update outstation visit details
    await outstationVisit.update({
      start,
      stop,
      distance,
      status,
      remark,
      travelAllowance,
      foodAllowance,
      accommodation,
    });

    res.status(200).json({
      success: true,
      outstationVisit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};
