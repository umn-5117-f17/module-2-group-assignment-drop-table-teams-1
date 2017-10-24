const express = require('express');
var router = express.Router();

// router.get('/', function(req, res){
//   res.render('profile')
// });

router.get('/create', function(req, res){
  var userObj = {
    'userId' : req.user._json.sub,
    'profilePic': req.user.picture,
    'name': req.user.name.givenName + ' ' + req.user.name.familyName,
    'title': 'No title',
    'focusArea': 'No focus',
    'project_Id': undefined,
    'cumRating': 0
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
  db.findOne({'userId': req.user._json.sub}).then(
      function(results){
        if(results){
          res.render('profile',{
            user: results
          });
          // console.log(results);
        } else {
          console.log('WTFF');
          res.redirect('/create');
          console.log('User not found');
        }
      }
  );
  // req.db.collection('Users').find().forEach(console.log);
  // console.log('done reading');
});

router.get('/delete', function(req, res){
    var db = req.db.collection('Users');
    db.deleteOne({'userId' : req.user._json.sub});
});

router.get('/update', function(req, res){
  var db = req.db.collection('Users');
  var form = req.query;
  console.log(form);
  db.updateOne({'userId': req.user._json.sub}, {$set : {'name': form.name, 'focusArea': form.focusArea, 'title': form.title}}).then(
    function(results){
      console.log('User profile has been updated.');
      res.redirect('/account');
    }
  );
});

module.exports = router;
