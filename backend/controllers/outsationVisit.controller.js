const Client = require("../model/client.model");
const outstationVisit = require("../model/outstationVisit.model");
const User = require("../model/user.model");

exports.createOutSationVisit = async (req, res) => {
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

    const outsationVisit = await outstationVisit.create({
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
