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

router.get('/my_projs', function(req, res, next) {
  console.log("name " + req.user.displayName);
  req.db.collection('projects')
    .find({'userId': req.user.displayName}).toArray(function(err, results) {
      res.render('index', { title: 'Project Sharing', projects: results});
    });
})

module.exports = router;
