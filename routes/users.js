var express = require('express');
var router = express.Router();
var Users = require('../app/models/users');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a users');
});

router.post('/', function(req, res, next) {
try{
   
} catch(ex){
  console.log("EXPCEPTION : "+ JSON.stringify(ex));
}
});





module.exports = router;
