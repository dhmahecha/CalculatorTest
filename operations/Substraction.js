'use strict'
module.exports = class Substraction {

   /**
   * 
   */
   constructor(){
 
   }

    doOperation(operands) {
      const operation = (accumulator, number) =>  accumulator - number;
      var result = operands.reduce(operation);
      console.log("Substraction: " + operands + " = " + result);
      return result;
    }
  }