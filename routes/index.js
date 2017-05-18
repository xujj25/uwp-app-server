var express = require('express');
var router = express.Router();
var serverOnValidator = require('../controllers/serverOnValidator');
var getNewsList = require('../controllers/getNewsList');
var getNewsDetail = require('../controllers/getNewsDetail');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('receive request for server on validator in router');  
  serverOnValidator(req, res, next);
});

/* GET news listing. */
router.get('/news', function(req, res, next) {
  console.log('receive request for news list in router');
  getNewsList(req, res, next);
});

/* GET news detail data */
router.get('/news_detail', function(req, res, next) {
  console.log('receive request for news detail in router');  
  getNewsDetail(req, res, next);
});

module.exports = router;
