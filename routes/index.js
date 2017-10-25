var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

/* GET home page. */
router.get('/', function(req, res, next) {
  req.db.collection('projects').find().toArray(function(err, results){
    res.render('index', { title: 'Project Sharing', projects: results});
  });
});

router.get('/thanks', function(req, res, next) {
  console.log("get thanks")
  res.render('thanks', req);
})

router.get('/subject/:sub', function(req, res, next) {
  var subj = req.params.sub;
  req.db.collection('projects').find({"subject": subj}).toArray(function(err, results){
    res.render('index', { title: 'Project Sharing', projects: results});

  });
})

router.get('/tag/:tag', function(req, res, next) {
  var tags = req.params.tag;
  req.db.collection('projects').find({"tags": tags}).toArray(function(err, results){
    res.render('index', { title: 'Project Sharing', projects: results});

  });
})

router.get('/my_projs', ensureLoggedIn('/login'), function(req, res, next) {
  console.log("name " + req.user.displayName);
  req.db.collection('projects')
    .find({'userId': req.user._json.sub}).toArray(function(err, results) {
      res.render('index', { title: 'Project Sharing', projects: results});
    });
})

module.exports = router;
