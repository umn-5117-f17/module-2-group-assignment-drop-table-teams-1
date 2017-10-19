var express = require('express');
var router = express.Router();

router.get('/', function(req, res, err) {
  res.redirect('/user/read')
});


module.exports = router;
