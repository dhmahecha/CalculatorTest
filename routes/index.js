var express = require('express');
var router = express.Router();

/**
 * Index calculator operation.
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Calculator API' });
});

module.exports = router;
