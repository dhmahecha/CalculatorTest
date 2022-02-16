var express = require('express');
var OperationController = require('../controllers/operation');
var router = express.Router();


/**
 * do operation. POST.
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
router.post('/:id/operations', OperationController.doNewOperation);

module.exports = router;