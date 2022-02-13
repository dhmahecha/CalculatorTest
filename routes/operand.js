var express = require('express');
var OperandController = require('../controllers/operand');
var router = express.Router();

/**
 * Add operand operation. POST.
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
router.post('/:id/operands', OperandController.addNewOperand);

module.exports = router;