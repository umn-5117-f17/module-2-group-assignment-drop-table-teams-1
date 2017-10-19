var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.db.collection('projects').find().toArray(function(err, results){
    //console.log(results);
    res.render('index', { title: 'Project Sharing', projects: results});
  });
  // res.render('index', {
  //   user: req.user
  // });
});

router.get('/thanks', function(req, res, next) {
  console.log("get thanks")
  res.render('thanks', req);
})

module.exports = router;
