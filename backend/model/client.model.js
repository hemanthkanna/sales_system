const { DataTypes } = require("sequelize");
const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Client = sequelize.define(
  "client",
  {
    clientId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 26],
      },
    //   get() {
    //     const value = this.getDataValue("clientName");
    //     return value.toUpperCase();
    //   },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    mobileNumber: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    purpose: {
      type: DataTypes.STRING,
      allowNull: false,
      isIn: {
        args: [["lead","enq","quotation","demo","app study"]],
        msg: 'Role must be one of the followings : "lead","enq","quotation","demo", "app study".',
      },
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Client;
