var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});



/* GET Signup page. */
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup' });
});



/* GET Dashboard page. */
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard' });
});


/* GET Timeline page. */
router.get('/timeline', function(req, res, next) {
  res.render('timeline', { title: 'Dashboard' });
});



/* GET About page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Dashboard' });
});


/* GET CUSTOMER page. */
// router.get('/customer', function(req, res, next) {
//   res.render('customer', { title: 'Customer' });
// });



module.exports = router;
