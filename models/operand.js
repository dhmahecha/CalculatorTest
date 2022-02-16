//sesion.js

var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

var operandSchema   = new Schema({
    number:{ 
        type: Number,
        required : true,
    }  
});
module.exports = mongoose.model('Operand', operandSchema);