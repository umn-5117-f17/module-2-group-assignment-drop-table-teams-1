var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;

router.get('/', function(req, res, next) {
  req.db.collection('projects').find().toArray(function(err, results){
    //console.log(results);
    //get project Id, query mongo for project
    //render with project
    var result = results[7];
    var tags = result.tags;
    //@TODO
    //Get most recent projects from MONGO
    var recentPosts = results.slice(1,5);
    res.render('project', {title: 'Project X', project: result, recentPosts: recentPosts, tags: tags});

  });
});

router.get('/:proj', function(req, res){
  var id = req.params.proj;
  //console.log("project id is = " + id);
  req.db.collection('projects')
    .findOne({'_id': ObjectId(id)}, function(err, results) {
      res.render('project', results);
    })
});

  module.exports = router;
