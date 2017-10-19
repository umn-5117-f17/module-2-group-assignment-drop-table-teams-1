var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

router.get('/', function(req, res, next) {
  req.db.collection('projects').find().toArray(function(err, results) {
    if (err) {
      next(err);
    }

    res.render('db', {
      todos: results
    });
  });
});

router.post('/search', function(req, res, next) {
  var search_text = req.body.search_text;
  var results = req.db.collection('projects').find({$text :{$search : search_text}});
  
})

module.exports = router;
