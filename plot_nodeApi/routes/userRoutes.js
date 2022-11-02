const express = require("express");
const { login, signup, test, updateProfile, changePassword, deleteUser, getAllUser, myProfile, getAuthToken } = require("../controller/userController");
const {protected} = require("../middleware/checkAuth");
const {upload} = require('../middleware/uploadFile');
const router = express.Router();
router.route("/").get(test);
router.route("/login").post(login);
router.route("/signup").post(upload.single('profile'),signup)
router.route("/updateProfile/:userid").put(protected,upload.any(), updateProfile);
router.route("/changePassword/:userid").put(protected,changePassword);
router.route("/deleteUser/:userid").put(protected,deleteUser);
router.route("/getAllUser").get(protected,getAllUser);
router.route("/myProfile/:userid").get(protected,myProfile);
router.route('/getAuthToken').get(getAuthToken);
module.exports = router