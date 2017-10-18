var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({limits: {fileSize: 2000000 },dest:'/uploads/' });
var ObjectId = require('mongodb').ObjectId;
var fs = require('fs-extra');
var util = require('util');

router.post('/insertProject', upload.single('ajaxfile'), function(req, res, next) {
  console.log("here in the server");
  console.log(req.body);
  if (!req.file) {
    res.status(500).send('error: no file');
  }
  if (req.file.mimetype == 'application/pdf') {
    // read the img file from tmp in-memory location
    var newImg = fs.readFileSync(req.file.path);
    // encode the file as a base64 string.
    var encImg = newImg.toString('base64');
    // parse tags by comma separated values
    var noSpaceTags = req.body.tags.replace( /\s/g, "")
    var tags = noSpaceTags.split(',');

    // create new document to be inserted into projects collection
    var newItem = {
      createDate: new Date(),
      lastEditDate: "unimplemented",
      userId: "unimplemented",
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
    // db.collection('projects')
    //    .insert(newItem, function(err, result){
    //    if (err) { console.log(err); };
    //       var newoid = new ObjectId(result.ops[0]._id);
    //       fs.remove(req.file.path, function(err) {
    //          if (err) { console.log(err) };
    //          res.render('index', {title:'Thanks for the Picture!'});
    //          });
    //       });
  } else {
    console.log('got a non-pdf file. You submitted a ' + req.file.mimetype);
  }
  // response
  res.json({
    'filename': req.file.originalname,
    'mimetype': req.file.mimetype,
    'size (bytes)': req.file.size
  });
});

router.post('/deleteProject', function(req, res, next) {
    /*
      req = {
        id: project ID
      }
    */
    req.db.collection('projects').deleteOne({"_id": ObjectId(req.body.id)},function(err, results){
      //send success status to client side
      res.status(200).send('success');
    });
});

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


module.exports = router;
