var express = require('express');
var router = express.Router();
const path = require('path');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../../dist/cms/browser/index.html'));
});

// router.get('/', function(req, res, next) {
//   res.render('index', {title: 'CMS'});
// });

module.exports = router;