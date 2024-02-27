const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user.model");
const Visit = require("./visit.model");
const Client = require("./client.model");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model");
db.Client = require("./client.model");
db.Visit = require("./visit.model");

User.hasMany(Visit, {
  foreignKey: "userId",
});
Visit.belongsTo(User);

Client.hasMany(Visit, {
  foreignKey: "clientId",
});
Visit.belongsTo(Client);

module.exports = db;
