const express = require("express");
const { createUserType, getUserType } = require("../controller/userController");
const {protected ,  webProtected} = require("../middleware/checkAuth");
const router = express.Router();
router.route("/createUserType").post(webProtected,createUserType);
router.route("/getUserType").get(webProtected,getUserType)

module.exports = router