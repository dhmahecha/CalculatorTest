'use strict'
// Cargamos los modelos para usarlos posteriormente
var Operand = require('../models/operand');
const Joi = require('joi');
var Operand = require('../models/operand');

/**
 * Se hace conexión a memcache, se crea un nuevo key para
 * almacenar un conjuto de valores.
 * @param {*} req 
 * @param {*} person 
 */
exports.operandValidator = async function(req,res,next){
  try{
    return await Operand.validate(req.body);
  }
  catch(error){
    console.log(error.message);
    throw error;
  }
} 

