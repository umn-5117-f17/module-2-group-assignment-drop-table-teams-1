var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({limits: {fileSize: 2000000 }});
var ObjectId = require('mongodb').ObjectId;
var fs = require('fs-extra');
var util = require('util');

/*
  this file is no longer used.

  all logic is moved to api.js
*/

module.exports = router;
