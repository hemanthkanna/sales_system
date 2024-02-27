const dotenv = require("dotenv");
const express = require("express");
const app = express();
const path = require("path");
const sequelize = require("./config/database");
const db = require("./model/db.index");

dotenv.config({ path: path.join(__dirname, "config/config.env") });

app.use(express.json());

const userRoutes = require("./routes/user.route");
const clientRoutes = require("./routes/client.route");
const visitRoutes = require("./routes/visit.route");

db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log(`Database connection successfully`);
  })
  .catch((err) => {
    console.log(`Database connection failure`, err);
  });

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/client", clientRoutes);
app.use("/api/v1/visit", visitRoutes);

app.listen(process.env.PORT, () => {
  console.log(
    `Server is listening to the PORT ${process.env.PORT} in ${process.env.ENVIRONMENT}`
  );
});
