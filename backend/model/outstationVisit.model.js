const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const outstationVisit = sequelize.define(
  "outstationVisit",
  {
    outstationVisitId: {
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
      allowNull: false,
      isIn: {
        args: [["success", "pending", "failure"]],
        msg: 'Role must be one of the followings "success","pending","failure"',
      },
    },
    remark: {
      type: DataTypes.STRING,
    },
    travelAllowance: {
      type: DataTypes.INTEGER,
      defaulValue: 0,
    },
    foodAllowance: {
      type: DataTypes.INTEGER,
      defaulValue: 0,
    },
    accomidation: {
      type: DataTypes.INTEGER,
      defaulValue: 0,
    },
    attach: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

module.exports = outstationVisit;
