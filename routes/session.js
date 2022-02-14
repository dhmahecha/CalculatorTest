var express = require('express');
var SessionController = require('../controllers/session');
var router = express.Router();


/**
 * Session calculator operation. GET.
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
router.get('/', SessionController.getNewSession);

module.exports = router;