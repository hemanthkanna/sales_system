const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Visit = sequelize.define(
  "visit",
  {
    visitId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    start: {
      type: DataTypes.DATE,
    },
    stop: {
      type: DataTypes.DATE,
    },
    distance: {
      type: DataTypes.FLOAT,
    },
    status: {
      type: DataTypes.STRING,
      isIn: {
        args: [["success", "pending", "failure"]],
        msg: 'Role must be one of the followings "success","pending","failure"',
      },
    },
    remark: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Visit;
