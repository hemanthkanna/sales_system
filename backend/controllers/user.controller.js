const { Op } = require("sequelize");
const User = require("../model/user.model");
const Visit = require("../model/visit.model");
const outstationVisit = require("../model/outstationVisit.model");

exports.createUser = async (req, res) => {
  try {
    const allowedRoles = ["admin", "employee"];
    if (!allowedRoles.includes(req.body.role)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid role value" });
    }

    const user = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      mobileNumber: req.body.mobileNumber,
      address: req.body.address,
      role: req.body.role,
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["userId", "userName", "email", "mobileNumber", "address"],
      include: [
        {
          model: Visit,
          attributes: ["visitId", "status", "remark"],
        },
        {
          model: outstationVisit,
          attributes: ["outstationVisitId", "status", "remark"],
        },
      ],
    });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

exports.getSingleUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId, {
      attributes: ["userId", "userName", "email", "mobileNumber", "address"],
      include: [
        {
          model: Visit,
          attributes: ["visitId", "status", "remark"],
        },
      ],
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.update(req.body, {
      where: { userId: userId },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: `Cannot update user with userId ${userId}. Maybe user not found`,
      });
    } else {
      res.status(200).json({
        success: true,
        user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    await user.destroy(userId);

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// find user based on condition
exports.findOneUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        role: {
          [Op.eq]: "admin",
        },
      },
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

//
exports.findOrCreateUser = async (req, res) => {
  try {
    const user = await User.findOrCreate({ where: { userName: "anbu" } });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

exports.findAndCountUser = async (req, res) => {
  try {
    const user = await User.findAndCountAll({
      where: { userName: "raj" },
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.restoreUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.restore({
      where: {
        userId: userId,
      },
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};
