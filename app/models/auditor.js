var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('node-uuid');

var auditorSchema = new Schema({
   id:  { type: String, required: true, unique: true },
   created_at: Date,
   updated_at: Date    
});

// on every save, add the date
auditorSchema.pre('save', function(next) {
  
  //Full Name 
  //this.fullName = this.firstName +" "+this.middleName+" "+this.lastName;  
  var id =uuid.v1();

  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at){
    this.created_at = currentDate;
    this.id = id;

  }

  next();
});


module.exports = mongoose.model('auditor', auditorSchema);
