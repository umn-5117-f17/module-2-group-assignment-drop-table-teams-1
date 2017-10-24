const express = require('express');
var router = express.Router();

router.get('/create', function(req, res){
  var userObj = {
    'userId' : req.user._json.sub,
    'profilePic': req.user.picture,
    'name': req.user.name.givenName + ' ' + req.user.name.familyName,
    'focusArea': null,
    'project_Id': [],
    'cumRating': 0,
    'intstitution': null,
    'bio': null
  };
  var db = req.db.collection('Users');
  db.findOne({'userId': req.user._json.sub}).then(
    function(err, results){
      if(results == null){
        db.insertOne(userObj);
        console.log('New User Created');
        res.status(200).send('success');
      } else {
        console.log('User already exists');
      }
    }
  )
  res.redirect('/account');
});

router.get('/', function(req, res){
  var db = req.db.collection('Users');
  // var p = req.db.collection('projects').find({'userId': req.user._json.sub}).forEach(console.log);
  // var project = req.db.collection('projects').find({'userId': req.user._json.sub}).toArray();
  db.findOne({'userId': req.user._json.sub}).then(
      function(results){
        if(results){
          var u = results;
          console.log('this is happening');
          req.db.collection('projects').find({'userId': req.user._json.sub}).toArray(function(err, results){
            console.log('the house is on fire');
            results.forEach(console.log);
            res.render('profile',{
              user: u,
              projects: results
            });
          });
        } else {
          res.redirect('/account/create');
          console.log('User not found');
        }
      }
  );
  // req.db.collection('Users').find().forEach(console.log);
});

router.get('/delete', function(req, res){
    var db = req.db.collection('Users');
    db.deleteMany({'userId' : req.user._json.sub});
    res.redirect('/account');
});

router.get('/update', function(req, res){
  var db = req.db.collection('Users');
  var form = req.query;
  if(form.name != ''){
    db.updateOne({'userId': req.user._json.sub}, {$set : {'name': form.name}});
  }
  if(form.focusArea != ''){
    db.updateOne({'userId': req.user._json.sub}, {$set : {'focusArea': form.focusArea}});
  }
  if(form.intstitution != ''){
    db.updateOne({'userId': req.user._json.sub}, {$set : {'intstitution' : form.intstitution}});
  }
  if(form.bio != ''){
    db.updateOne({'userId': req.user._json.sub}, {$set : {'bio': form.bio}});
  }
  console.log('User successfully updated.');
  res.redirect('/account');
});

module.exports = router;
