const { DataTypes } = require("sequelize");
const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "user",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 16],
      },
    //   get() {
    //     const value = this.getDataValue("userName");
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
    password: {
      type: DataTypes.STRING,
    },
    mobileNumber: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "employee",
      allowNull: false,
      validate : {
        isIn: {
            args: [['admin', 'employee']],
            msg: 'Role must be either "admin" or "employee".',
          },
      }
    },
  },

  {
    timestamps: true,
    paranoid: true,
  }
);

module.exports = User;
