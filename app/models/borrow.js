var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('node-uuid');

var borrowSchema = new Schema({
   id:  { type: String, required: true, unique: true },
   created_at: Date,
   updated_at: Date    

});


module.exports = mongoose.model('borrow', borrowSchema);
