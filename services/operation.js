'use strict'
// Cargamos los modelos para usarlos posteriormente
var ReflectUtil = require('../utils/reflectUtil');
var ArithmeticOperations = require('../enums/arithmeticOperations');
var OperationStrategy = require('../operations/operationStrategy');
const nodeEval = require('node-eval');
var Operation = require('../models/operation');

/**
 * Se hace conexión a memcache, se crea un nuevo key para
 * almacenar un conjuto de valores.
 * @param {*} req 
 * @param {*} person 
 */
exports.validator = async function(req,res,next){
  try{
    return await Operation.validate(req.body);
  }
  catch(error){
    console.log(error.message);
    throw error;
  }  
} 

exports.instantiateOperation = async function(req,res,next,operandsArray){
 try{
    var operation = req.body.operation;
    var operationVar = require('../operations/'+ operation);
    nodeEval("var " + operation + " = " + operationVar);

    ReflectUtil.newInstance = function(strClass) {
      var args = Array.prototype.slice.call(arguments, 1);
      var clsClass = nodeEval(strClass);
      function F() {
          return new clsClass;
      }
      F.prototype = clsClass.prototype;
      return new F();
    }
    var classOperation = ReflectUtil.newInstance(operation);

    var operationStrategy = new OperationStrategy(classOperation);
    var result = operationStrategy.doOperation(operandsArray);


    return result;
  }
  catch(error){
    console.log(error.message);
    throw error;
  }
} 