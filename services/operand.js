'use strict'
// Cargamos los modelos para usarlos posteriormente
var ArithmeticOperations = require('../enums/arithmeticOperations');
var Operand = require('../models/operand');

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