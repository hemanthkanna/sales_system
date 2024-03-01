const express = require("express");
const {
  createUser,
  deleteUser,
  getUsers,
  getSingleUser,
  updateUser,
  findOneUser,
  findOrCreateUser,
  findAndCountUser,
  restoreUser,
  login,
  logout,
} = require("../controllers/user.controller");
const { isAdmin } = require("../utils/authroizedRole");
const router = express.Router();

router.route("/").post(createUser);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(getUsers);
router.route("/findOne/").get(isAdmin, findOneUser);
router.route("/findOrCreate/").get(isAdmin, findOrCreateUser);
router.route("/findAndCount").get(isAdmin, findAndCountUser);
router.route("/:id").get(isAdmin, getSingleUser);
router.route("/:id").put(isAdmin, updateUser);
router.route("/:id").delete(isAdmin, deleteUser);
router.route("/restore/:id").post(restoreUser);

module.exports = router;
