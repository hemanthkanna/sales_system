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
router.route("/").get(getUsers);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route("/findOne/").get(findOneUser);
router.route("/findOrCreate/").get(findOrCreateUser);
router.route("/findAndCount").get(findAndCountUser);
router.route("/:id").get(getSingleUser);
router.route("/:id").put(isAdmin,updateUser);
router.route("/:id").delete(isAdmin,deleteUser);
router.route("/restore/:id").post(restoreUser);



module.exports = router;
