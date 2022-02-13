'use strict'

// Cargamos los controladores para usarlos posteriormente
var SessionService = require('../services/session');
var OperandService = require('../services/operand');
const messageType = require('../enums/MessageType'); 
var ResponseUtil = require('../utils/ResponseUtil');
var MessageUtil = require('../utils/MessageUtil');
var CalculatorUtil = require('../utils/CalculatorUtil');
var HttpStatus = require('http-status-codes');

/**
 * controller para agregar un nuevo operando
 * @param {*} req 
 * @param {*} res 
 */
exports.addNewOperand = function(req, res, next){
  try
  {
    var id = req.params.id;
    var number = req.body.number;
    var operandService = OperandService.operandValidator(req);
    operandService.then((results) => {
      if(id != undefined){
        var service = SessionService.getValueByKey(req.params.id);
        service.then((results) => {
          var sessionArray = Array.from(results.value);
          sessionArray.push(number);
          SessionService.setValueSession(id, sessionArray);
          var calculator = CalculatorUtil.getCalculator(sessionArray, null, null);
          var responseUtil = new ResponseUtil(null, calculator);
          var respuesta = responseUtil.getResponse();
          return res.json(respuesta); 
        }).catch(function (error) {
          return res.status(HttpStatus.StatusCodes.BAD_REQUEST).
                  send(MessageUtil.getMessage(messageType.ERROR, 30001, HttpStatus.ReasonPhrases.BAD_REQUEST, 
                    "Ocurrio un error al tratar de obtener la sesión : " + error.message));
        });
      }
      else{
        return res.status(HttpStatus.StatusCodes.NOT_FOUND).
        send(MessageUtil.getMessage(messageType.ERROR, 30002, HttpStatus.ReasonPhrases.NOT_FOUND, 
          "El parametro identificador de la sesión es obligatorio"));
      }

    }).catch(function (error) {
      return res.status(HttpStatus.StatusCodes.BAD_REQUEST).
      send(MessageUtil.getMessage(messageType.ERROR, 30001, HttpStatus.ReasonPhrases.BAD_REQUEST, 
        "Ocurrio un error al validar el operando : " + error.message));
      });

  }
  catch(exception){
    console.error(exception);
    res.status(HttpStatus.StatusCodes.BAD_REQUEST).
              send(MessageUtil.getMessage(messageType.ERROR, 30001, HttpStatus.ReasonPhrases.BAD_REQUEST, 
                "Ocurrio un error al tratar de procesar la solicitud :" + exception));
  }
}