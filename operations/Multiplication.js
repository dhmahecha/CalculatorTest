'use strict'
module.exports = class Addition {

   /**
   * 
   */
   constructor(){
 
   }

    doOperation(operands) {
      console.log(operands);
      const operation = (accumulator, number) =>  accumulator * number;
      return operands.reduce(operation);
    }
  }