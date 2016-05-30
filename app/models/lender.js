var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('node-uuid');

var lenderSchema = new Schema({
   id:  { type: String, required: true, unique: true },
   user: { type : mongoose.Schema.Types.ObjectId, ref: 'Users' },
   created_at: Date,
   updated_at: Date    
});


module.exports = mongoose.model('lender', lenderSchema);
