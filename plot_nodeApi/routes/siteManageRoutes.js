const express = require("express");
const { createSiteOption, getSiteOption, saveContactor, deltedSiteOption, updateSiteOption, deletedSiteOption } = require("../controller/siteController");
const {protected ,  webProtected} = require("../middleware/checkAuth");
const {upload} = require('../middleware/uploadFile');
const router = express.Router();
router.route("/createSiteOption").post(protected, upload.single('image'), createSiteOption);
router.route("/getSiteOption").get(webProtected,getSiteOption);
router.route("/updatesiteContent/:id").put(protected,updateSiteOption);
router.route("/deletesiteContent/:id").put(protected,deletedSiteOption);
router.route("/saveContactor").post(webProtected, saveContactor);

module.exports = router