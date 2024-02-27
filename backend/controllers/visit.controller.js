const Client = require("../model/client.model");
const User = require("../model/user.model");
const Visit = require("../model/visit.model");

exports.createVisit = async (req, res) => {
  try {
    const { userId, clientId, start, stop, distance, status, remark } =
      req.body;

    const user = await User.findByPk(userId);
    const client = await Client.findByPk(clientId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    const visit = await Visit.create({
      userId,
      clientId,
      start,
      stop,
      distance,
      status,
      remark,
    });

    res.status(200).json({
      success: true,
      visit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};
