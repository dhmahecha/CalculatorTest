//operand.js

var mongoose                   = require('mongoose');
const ArithmeticOperations     = require('../enums/arithmeticOperations');
var Schema                     = mongoose.Schema;

var calculatorSchema   = new Schema({
    operands: [{
        type: Number,
        required:true
    }],
    operation : {
        type: String,
        enum: Object.values(ArithmeticOperations),
    },
    result: {
        type: Number
    }
});

module.exports = mongoose.model('Calculator', calculatorSchema);