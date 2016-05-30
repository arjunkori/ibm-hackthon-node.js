var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('node-uuid');

var userSchema = mongoose.Schema({
    id:  { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true},
    userType: {type: Number},// CUSTOMER / ADUITOR / LENDER
    customer: { type : mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    lender: { type : mongoose.Schema.Types.ObjectId, ref: 'Lender' },
    auditor: { type : mongoose.Schema.Types.ObjectId, ref: 'Auditor' },
    created_at: Date,
    updated_at: Date    
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


// on every save, add the date
userSchema.pre('save', function(next) {
  
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


//Post Save - Configure Redis 
// userSchema.post('save', function (doc) {
//     console.log('post saving...', JSON.stringify(this));
//      // STORE AT REDIS 
 
//     if (doc.wasNew) {
//         console.log("Sending email");
//         //mailingService.welcome(this.email);
//     }

// });


// create the model for users and expose it to our app
module.exports = mongoose.model('userinfo', userSchema,'userinfo');
