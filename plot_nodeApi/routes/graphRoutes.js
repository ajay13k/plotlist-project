
const { graph } = require('../controller/graphController');
const {protected} = require('../middleware/checkAuth');

const router = require('express').Router();

router.route('/graph').get(protected ,graph)

module.exports = router