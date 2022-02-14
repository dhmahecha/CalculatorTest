'use strict'

var Calculator = require('../models/calculator');

module.exports = class CalculatorUtil {

 /**
  * 
  */
  constructor(){
 
  }


  /**
   * Se almacenan los atributos de la calculadora.
   * @param {*} operation 
   * @param {*} operands 
   * @param {*} result 
   * @returns 
   */
  static getCalculator(operands, operation, result) {
    var calculator = new Calculator();
    calculator.operands = operands;
    calculator.operation = operation;
    calculator.result = result;
    return calculator;
  }
}