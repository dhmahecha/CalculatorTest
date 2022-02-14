//sesion.js

var mongoose              = require('mongoose');
var ArithmeticOperations = require('../enums/arithmeticOperations');
var Schema                = mongoose.Schema;

var operationSchema   = new Schema({
    operation:{ 
        type: String,
        enum: Object.values(ArithmeticOperations),
        required : true,
    }  
});
module.exports = mongoose.model('Operation', operationSchema);