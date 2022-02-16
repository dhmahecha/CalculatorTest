'use strict'
module.exports = class Addition {

   /**
   * 
   */
   constructor(){
 
   }

    doOperation(operands) {
      const operation = (accumulator, number) =>  accumulator + number;
      var result = operands.reduce(operation);
      console.log("Addition: " + operands + " = " + result);
      return result;
    }
  }