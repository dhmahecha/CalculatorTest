//operand.js

var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;

var calculatorSchema   = new Schema({
    operands: [{
        type: Number,
        required:true
    }],
    operation : {
        type: String
    },
    result: {
        type: Number
    }
});

module.exports = mongoose.model('Calculator', calculatorSchema);