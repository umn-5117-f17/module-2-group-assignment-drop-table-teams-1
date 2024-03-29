var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({limits: {fileSize: 2000000 }});
var ObjectId = require('mongodb').ObjectId;
var fs = require('fs-extra');
var util = require('util');

router.post('/insertProject', upload.single('ajaxfile'), function(req, res, next) {
  console.log("here in the server");
  //console.log(req.user)
  //console.log(req.body);
  if (!req.file) {
    res.status(500).send('error: no file');
  }
  if (req.file.mimetype == 'image/jpeg') {
    // read the img file from tmp in-memory location
    // var newImg = fs.readFileSync(req.file);
    // encode the file as a base64 string.
    var encImg = req.file.buffer.toString('base64');
    // parse tags by comma separated values
    var noSpaceTags = req.body.tags.replace( /\s/g, "")
    var tags = noSpaceTags.split(',');

    // create new document to be inserted into projects collection
    var newItem = {
      createDate: new Date(),
      lastEditDate: "unimplemented",
      userId: req.user._json.sub,
      userName: req.user.nickname,
      collaboratorId: "unimplemented",
       description: req.body.description,
       contentType: req.file.mimetype,
       size: req.file.size,
       pdfProject: Buffer(encImg, 'base64'),
       pdfName: req.file.originalname,
       title: req.body.title,
       subject: req.body.subject,
       tags: tags,
       rating: "unimplemented",
       comments: "unimplemented"
    };
    // mongo call to insert newItem
    req.db.collection('projects').insertOne(newItem, function(err, results) {
      //res.status(200).send('success');
    });
  } else {
    console.log('got a non-pdf file. You submitted a ' + req.file.mimetype);
  }
  // response
  var js = {
    userID: req.user.displayName,
    title: req.body.title,
    proj: req.file.originalname
  };
  //res.redirect("/thanks");
  res.json({
    'filename': req.file.originalname,
    'mimetype': req.file.mimetype,
    'size (bytes)': req.file.size
  });
});

router.get('/deleteProject/:projid', function(req, res, next) {
    var project = req.params.projid;
    req.db.collection('projects').deleteOne({"_id": ObjectId(project)},function(err, results){
      //send success status to client side
      res.status(200).send('success');
    });
});

router.get('/search', function(req, res, next) {
  var searchText = req.query.s;
  req.db.collection('projects').find( { "tags": searchText } ).toArray(function(err, results){
    // console.log("why aint you rendering");
    res.render('index', { title: 'Project Sharing', projects: results});
  });
})

router.post('/updateProject', function(req, res, next) {
    /*
      req = {
        id: project ID
        item: what to update
        value: value to be updated to
      }
    */
    var item = req.body.item;
    var id = {
      "_id": ObjectId(req.body.id)
    };
    var s = {
      $set: { item: req.body.value}
    };
     req.db.collection('projects').updateOne(id, s,function(err, results){
       //send success status to client side
       res.status(200).send('success');
     });
});

router.post('/addTag', function(req, res, next) {
    /*
      req = {
        id: project ID
        value: value to be updated to
      }
    */
    console.log(req.body.value);
     req.db.collection('projects').updateOne({
       "_id": ObjectId(req.body.id)
     }, {
       $addToSet: { "tags": req.body.value}
     },function(err, results){
       //send success status to client side
       console.log("added tag")
       res.status(200).send('success');
     });
});
router.post('/updateDescription', function(req, res, next) {
    /*
      req = {
        id: project ID
        value: value to be updated to
      }
    */
    console.log(req.body.value);
     req.db.collection('projects').updateOne({
       "_id": ObjectId(req.body.id)
     }, {
       $set: { "description": req.body.value}
     },function(err, results){
       //send success status to client side
       console.log("updated description")
       res.status(200).send('success');
     });
});

// Users
router.post('/insertUser', function(req, res, next) {
    /*
      req = {
        id: user ID
        profilePic:
        name:
        title:
        focusArea:
        project_Id:
      }
    */
    var newItem = {

    };

    req.db.collection('Users').insertOne(newItem,function(err, results){
      //send success status to client side
      res.status(200).send('success');
    });
});

router.post('/deleteUser', function(req, res, next) {
    /*
      req = {
        id: user ID
      }
    */
    req.db.collection('Users').deleteOne({"_id": ObjectId(req.body.id)},function(err, results){
      //send success status to client side
      res.status(200).send('success');
    });
});

router.post('/updateUser', function(req, res, next) {
    /*
      req = {
        id: user ID
        item: item to be updated
        value: new value to be set to
      }
    */
    var item = req.body.item;
    var id = {
      "_id": ObjectId(req.body.id)
    };
    var s = {
      $set: { item: req.body.value}
    };
    req.db.collection('Users').updateOne(id, s,function(err, results){
      //send success status to client side
      res.status(200).send('success');
    });

});

router.post('/search', function(req, res, next) {
    console.log("tst");
    var search_text = req.body.search;
    console.log(search_text);
    //res.status(200).send('success');
    req.db.collection('projects').find({'tags' : search_text}, function(err, results){
      console.log(results);
      res.status(200).send('success');
    });
    console.log("after query");
    //console.log(results);
});

router.get('/picture/:picture', function(req, res){
  // console.log("in get picture");
  // assign the URL parameter to a variable
  var filename = req.params.picture;
  req.db.collection('projects')
    .findOne({'_id': ObjectId(filename)}, function(err, results){
    // set the http response header so the browser knows this
    // is an 'image/jpeg' or 'image/png'
  //console.log("title = " + results.title);
  res.setHeader('content-type', results.contentType);
    // send only the base64 string stored in the img object
    // buffer element
  res.send(results.pdfProject.buffer);
  });
});

router.get('/project/:proj', function(req, res){
  var id = req.params.proj;
  console.log("project id is = " + id);
  req.db.collection('projects')
    .findOne({'_id': ObjectId(id)}, function(err, results) {
      res.render('project', results);
    })
});


module.exports = router;
