var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
   id:  { type: String, required: true, unique: true },
   name: {type: String},
   age: {type: String},
   about: {type: String},
   educationQualification: {type: String},
   employmentType: {type: String},
   totalWorkExp: {type: String},
   loanAmount: {type: String},
   loanPeriod: {type: String},
   purposeOfLoan: {type: String},
   verify: {type: Boolean},
   auditor: {type: String},
   created_at: Date,
   updated_at: Date    
});

customerSchema.pre('save', function(next) {
  
  //Full Name 
  //this.fullName = this.firstName +" "+this.middleName+" "+this.lastName;  

  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at){
    this.created_at = currentDate;
    this.verify = false;
  }
  next();
});



module.exports = mongoose.model('customer', customerSchema);
