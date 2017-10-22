var express = require('express');
var router = express.Router();

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

  module.exports = router;