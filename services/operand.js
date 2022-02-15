'use strict'
// Cargamos los modelos para usarlos posteriormente
var ArithmeticOperations = require('../enums/arithmeticOperations');
var Operand = require('../models/operand');
var SessionService = require('../services/session');

/**
 * Se hace conexión a memcache, se crea un nuevo key para
 * almacenar un conjuto de valores.
 * @param {*} req 
 * @param {*} person 
 */
exports.validator = async function(req,res,next){
  try{
    return await Operand.validate(req.body);
  }
  catch(error){
    console.log(error.message);
    throw error;
  }
} 


/**
 * Se reliza la operación con el conjunto de números del arreglo
 * @param {*} id 
 * @param {*} operandsArray 
 * @param {*} number 
 * @returns Array
 */
 exports.addOperand = function(id, operandsObj, number){
  try{
    var operandsArray = Array.from(operandsObj);
    operandsArray.push(number);
    SessionService.setValueSession(id, operandsArray);
    return operandsArray;
  }
  catch(error){
    console.log(error.message);
    throw error;
  }
} 
