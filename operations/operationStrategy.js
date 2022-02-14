'use strict'
module.exports = class OperationStrategy {
    constructor(_operation){
        this._operation = _operation;
    }

    doOperation( operands ) {
       return this._operation.doOperation(operands);
    }
}