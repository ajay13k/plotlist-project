const { createCategory, getCategory } = require('../controller/categoryController');
const {protected} = require('../middleware/checkAuth');
const {upload} = require('../middleware/uploadFile');
const router = require('express').Router();

router.route('/createCategory').post(protected ,upload.any(),createCategory)
router.route('/getCategory').get(getCategory);
module.exports = router