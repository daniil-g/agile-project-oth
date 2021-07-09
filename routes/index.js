var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/book', function(req, res, next) {
  res.render('booktimeslot', { title: 'Express' });
});




/* GET datepicker page. */
router.get('/bookdate', function(req, res, next) {
  res.render('datepicker');
});
module.exports = router;
