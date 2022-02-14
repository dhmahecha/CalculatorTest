'use strict'
module.exports = class Addition {

   /**
   * 
   */
   constructor(){
 
   }

    doOperation(operands) {
      console.log(operands);
      var acum = 0;
      for (var i = 0; i < operands.length; i++) {
        if(i == 0){
          acum = Math.pow(operands[i], operands[i+1]);
          i++
        }
        else{
          acum = Math.pow(acum,operands[i]);
        }
      }
      return acum;
    }
  }