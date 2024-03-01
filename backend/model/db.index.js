const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user.model");
const Visit = require("./visit.model");
const Client = require("./client.model");
const OutstationVisit = require("./outstationVisit.model");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model");
db.Client = require("./client.model");
db.Visit = require("./visit.model");
db.OutstationVisit = require("./outstationVisit.model");

// Relationships

User.hasMany(Visit, {
  foreignKey: "userId",
});
Visit.belongsTo(User);

User.hasMany(OutstationVisit, {
  foreignKey: "userId",
});
OutstationVisit.belongsTo(User);

Client.hasMany(Visit, {
  foreignKey: "clientId",
});
Visit.belongsTo(Client);

Client.hasMany(OutstationVisit, {
  foreignKey: "clientId",
});
OutstationVisit.belongsTo(Client);

module.exports = db;
