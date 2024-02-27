const Client = require("../model/client.model");

exports.createClient = async (req, res) => {
  try {
    const allowedPurposes = ["lead","enq","quotation","demo","app study"];
    if (!allowedPurposes.includes(req.body.purpose)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid purpose value" });
    }

    const client = await Client.create({
      clientId: req.body.clientId,
      clientName: req.body.clientName,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      address: req.body.address,
      purpose: req.body.purpose,
    });

    res.status(200).json({
      success: true,
      client,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};
