var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({limits: {fileSize: 2000000 },dest:'/uploads/' });
var ObjectId = require('mongodb').ObjectId;
var fs = require('fs-extra');
var util = require('util');
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
  res.render('upload', {
    scripts: ['file-upload.js'],
  });

});

router.post('/upload-file-ajax', upload.single('ajaxfile'), function(req, res) {
  console.log("here in the server");
  if (!req.file) {
    res.status(500).send('error: no file');
  }
  if (req.file.mimetype == 'application/pdf') {
    // read the img file from tmp in-memory location
    //console.log(req.file)
    var newImg = fs.readFileSync(req.file.path);
    // encode the file as a base64 string.
    var encImg = newImg.toString('base64');
    // define your new document
    var noSpaceTags = req.body.tags.replace( /\s/g, "")
    var tags = noSpaceTags.split(',');
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

    req.db.collection('projects').insertOne(newItem, function(err, results) {
      if(err) {
        console.log(err);
      } else {
        res.status(200).send('success');
      }
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
    console.log('got a non-pdf file. here are some bytes:');
    console.log(req.file.mimetype);
  }
  // actually do something with file...

  res.json({
    'filename': req.file.originalname,
    'mimetype': req.file.mimetype,
    'size (bytes)': req.file.size
  });
})

router.get('/picture/:picture', function(req, res){
  console.log("in get picture");
   // assign the URL parameter to a variable
var filename = req.params.picture;
// open the mongodb connection with the connection
// string stored in the variable called url.
   req.db.collection('projects')
// perform a mongodb search and return only one result.
// convert the variabvle called filename into a valid
// objectId.
     .findOne({'_id': ObjectId(filename)}, function(err, results){
         // set the http response header so the browser knows this
// is an 'image/jpeg' or 'image/png'
    console.log("title = " + results.title);
    res.setHeader('content-type', results.contentType);
    // send only the base64 string stored in the img object
    // buffer element
         res.send(results.pdfProject.buffer);
      });
});
module.exports = router;
