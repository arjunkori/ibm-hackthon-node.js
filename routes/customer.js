var express = require('express');
var router = express.Router();
var Customer = require('../app/models/customer');
var uuid = require('node-uuid');
var async = require('async');

/* GET cusomter listing. */
router.get('/', function(req, res, next) {

    var customerlist = [];
    //List all properties
    Customer.find({}, function(err, _customers) {
        if (err) throw err;

        // object of all the users
        console.log("********************* LIST ALL CUSTOMER ****************************");
        console.log(JSON.stringify(_customers));

        async.eachSeries(_customers, function(_customer, callback) {
            //_properties.forEach(function(_property){
            // Iterate each Properties 
            if (_customer && _customer.id) {
                var _cust = {}
                    //Id
                _cust.id = _customer._id;
                //CUSTOMER NAME 
                _cust.name = _customer.name != null ? _customer.name : "NA";
                //VERIFIED  
                _cust.verify = _customer.verify != null ? _customer.verify : "NA";
                //LOAN AMOUNT 
                _cust.loanAmount = _customer.loanAmount != null ? _customer.loanAmount : "NA";
                //LOAN PERIOD
                _cust.loanPeriod = _customer.loanPeriod != null ? _customer.loanPeriod : "NA";
                //EMPLOYMENT PERIOD 
                _cust.employmentType = _customer.employmentType != null ? _customer.employmentType : "NA";

                customerlist.push(_cust);
                callback();
            }
        }, function(err) {
            if (err) {
                //throw err;
                console.log("ERROR RECORED FETCH CUSTOMER : " + JSON.stringify(err));
            }

            res.render('customer', {
                title: 'Customer Listing',
                customerlist: customerlist
            });


        });

    });


});


/* GET cusomter listing. */
router.get('/:id', function(req, res, next) {
    try {
        //res.end(req.params.id);

        //FIND Customer BY ID 
        var id = (req.params.id).toString();
        Customer.findById({
            _id: id
        }, function(err, customer) {
            if (err) throw err;

            //FORMAT IT IN STRING AND SHOW IT
            var textData = customer.about;
            personality_insights.profile({
                text: textData
            }, function(err, summary) {
                if (err) {
                    console.log("####### ERROR OCCURED IN profile ############" + JSON.stringify(err));
                } else {
                    //console.log("The users profile insights are "+JSON.stringify(summary));


                    //############## VALUES ###########################

                    console.log("VALUES 5 " + JSON.stringify(summary.tree.children[2]));
                    var percentage = summary.tree.children[2].children[0].percentage;

                    console.log("######## @@@ " + percentage);
                    var closeness = summary.tree.children[2].children[0].children[0].percentage;
                    var curiosity = summary.tree.children[2].children[0].children[1].percentage
                    var excitement = summary.tree.children[2].children[0].children[2].percentage
                    var harmony = summary.tree.children[2].children[0].children[3].percentage
                    var liberty = summary.tree.children[2].children[0].children[4].percentage

                    //#############3 BIG 5 #############################

                    //Opensess
                    var Opensess = summary.tree.children[0].children[0].children[0].percentage //Adventurousness


                    //Conscientiousness
                    var Conscientiousness = summary.tree.children[0].children[0].children[1].percentage //Emotionality

                    //Extraversion
                    var Extraversion = summary.tree.children[0].children[0].children[2].percentage //Imagination

                    //Agreeableness
                    var Agreeableness = summary.tree.children[0].children[0].children[3].percentage //Imagination


                    //Emotional range

                    var Emotional = summary.tree.children[0].children[0].children[4].percentage //Imagination


                    res.render('customerInsights', {
                        percentages: percentage,
                        closeness: closeness,
                        curiosity: curiosity,
                        excitement: excitement,
                        harmony: harmony,
                        liberty: liberty,
                        Opensess: Opensess,
                        Conscientiousness: Conscientiousness,
                        Extraversion: Extraversion,
                        Agreeableness: Agreeableness,
                        Emotional: Emotional,
                        customer: customer
                    });
                }
            })




            /*res.render('customerInsights', {
                title: 'Customer Insights',
                customer: customer
            });*/
        });



    } catch (ex) {

    }
});

router.post('/:id', function(req, res, next) {
    console.log("*************** PUT CALLED ********************");

    var id = (req.params.id).toString();
    Customer.findById({
        _id: id
    }, function(err, customer) {
        if (err) throw err;


        customer.verify = true;
        customer.auditor = req.body.feedback != null ? req.body.feedback : null;
        customer.save(function(err) {
            if (err) throw err;
            //res.render('customer', { title: 'Customer Listing',customer: customer  });
            console.log('***************** REDIRECT ********************');
            res.redirect('/customer');
        });

    });

});


/* GET cusomter listing. */
router.post('/', function(req, res, next) {

    try {
        //GET ALL BODY DATA 
        var id = uuid.v1();
        var _customer = new Customer({
            id: id,
            name: req.body.name != null ? req.body.name : null,
            age: req.body.age != null ? req.body.age : null,
            about: req.body.about != null ? req.body.about : null,
            educationQualification: req.body.educationQualification != null ? req.body.educationQualification : null,
            employmentType: req.body.employmentType != null ? req.body.employmentType : null,
            totalWorkExp: req.body.totalWorkExp != null ? req.body.totalWorkExp : null,
            loanAmount: req.body.loanAmount != null ? req.body.loanAmount : null,
            loanPeriod: req.body.loanPeriod != null ? req.body.loanPeriod : null,
            purposeOfLoan: req.body.purposeOfLoan != null ? req.body.purposeOfLoan : null

        });


        _customer.save(function(err) {

            if (err) {
                //throw err;
                console.log("MONGO ERROR: " + JSON.stringify(err));
                if (err.code == 11000) {
                    // Duplicate Users FOUND
                    res.send('Duplicate User FOUND ');
                } else {
                    res.send('Unknow Error : ' + JSON.stringify(err));
                }
            } else {
                console.log('customer saved successfully!');
                res.json('successfully saved');
            }
        });


    } catch (ex) {
        console.log("RECORD EXCEPTION AT REGISTRATION : " + JSON.stringify(ex));
    }

    //res.send('respond with a resource');
});


module.exports = router;