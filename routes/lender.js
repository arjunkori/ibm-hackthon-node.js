var express = require('express');
var router = express.Router();
var Customer = require('../app/models/customer');
var uuid = require('node-uuid');
var async = require('async');

/* GET lender listing. */
router.get('/', function(req, res, next) {
  var customerlist=[];
  //List all properties
  Customer.find({verify: true}, function(err, _customers) {
    if (err) throw err;

    // object of all the users
    console.log("********************* LIST ALL CUSTOMER ****************************");
    console.log(JSON.stringify(_customers));
    
    async.eachSeries(_customers, function(_customer, callback) {
    //_properties.forEach(function(_property){
      // Iterate each Properties 
      if(_customer && _customer.id){
          var _cust = {}
          //Id
          _cust.id = _customer._id;
          //CUSTOMER NAME 
          _cust.name = _customer.name != null ? _customer.name : "NA";
          //VERIFIED  
          _cust.verify = _customer.verify != null ? _customer.verify : "NA";
          //LOAN AMOUNT 
          _cust.loanAmount = _customer.loanAmount !=null ? _customer.loanAmount : "NA";
          //LOAN PERIOD
          _cust.loanPeriod = _customer.loanPeriod != null ? _customer.loanPeriod : "NA";
          //EMPLOYMENT PERIOD 
          _cust.employmentType = _customer.employmentType !=null ? _customer.employmentType : "NA";

          customerlist.push(_cust);
          callback();
      }      
     }, function(err) {
          if (err) {
              //throw err;
              console.log("ERROR RECORED FETCH CUSTOMER : "+ JSON.stringify(err));
          }
          
         res.render('lender', { title: 'Customer Listing',customerlist: customerlist  });

          
    });
   
  }); 
    
  
});



/* GET cusomter listing. */
router.get('/:id', function(req, res, next) {
    try{
        //res.end(req.params.id);
        
        //FIND Customer BY ID 
        var id = (req.params.id).toString();
        Customer.findById({_id: id}, function(err, customer) {
            if (err) throw err;
            
         res.render('lenderReviewer', { title: 'Lender Review',customer: customer  });
        });
        
        

    }catch(ex){
        
    }
});


module.exports = router;
