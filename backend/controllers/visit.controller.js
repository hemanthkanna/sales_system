const Client = require("../model/client.model");
const User = require("../model/user.model");
const Visit = require("../model/visit.model");

exports.createVisit = async (req, res) => {
  try {
    const { userId, clientId } = req.body;

    const user = await User.findByPk(userId);
    const client = await Client.findByPk(clientId);

    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    if (!client) {
      return res.status(400).json({
        error: "Client not found",
      });
    }

    const visit = await Visit.create({
      clientId,
    });

    await user.addVisit(visit);

    res.status(200).json({
      success: true,
      visitId: visit.visitId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

exports.visitSelfAssign = async (req, res) => {
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

exports.updateVisit = async (req, res) => {
  try {
    const { visitId, start, stop, distance, status, remark } = req.body;

    // Fetch the visit
    const visit = await Visit.findByPk(visitId);

    if (!visit) {
      return res.status(404).json({ error: "Visit not found" });
    }

    // Update visit details
    await visit.update({
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
