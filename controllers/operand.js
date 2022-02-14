'use strict'
// Cargamos los controladores para usarlos posteriormente
var SessionService = require('../services/session');
var OperandService = require('../services/operand');
var ResponseUtil = require('../utils/responseUtil');
var MessageUtil = require('../utils/messageUtil');
var CalculatorUtil = require('../utils/calculatorUtil');
var HttpStatus = require('http-status-codes');
var CalculatorConstants = require('../constants/calculatorConstants');
const MessageType = require('../enums/messageType'); 

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
    var operandService = OperandService.validator(req);
    operandService.then((results) => {
      if(id != undefined){
        var service = SessionService.getValueByKey(id);
        service.then((results) => {
          if(results.value == null || results.value == undefined){
            throw new Error("Sesión inexistente, por favor envíe un identificador válido");
          }
          var operandsArray = Array.from(results.value);
          operandsArray.push(number);
          SessionService.setValueSession(id, operandsArray);
          var calculator = CalculatorUtil.getCalculator(operandsArray, null, null);
          var responseUtil = new ResponseUtil(null, calculator);
          var respuesta = responseUtil.getResponse();
          return res.json(respuesta); 
        }).catch(function (error) {
          return res.status(HttpStatus.StatusCodes.NOT_FOUND).
                  send(MessageUtil.getMessage(MessageType.ERROR, CalculatorConstants.ERROR_OBTENIENDO_SESION, HttpStatus.ReasonPhrases.NOT_FOUND, 
                    "Ocurrio un error obteniendo la sesión: " + error.message));
        });
      }
      else{
        return res.status(HttpStatus.StatusCodes.NOT_FOUND).
        send(MessageUtil.getMessage(MessageType.ERROR, CalculatorConstants.ERROR_PARAMETRO_OBLIGATORIO, HttpStatus.ReasonPhrases.NOT_FOUND, 
          "El parametro identificador de la sesión es obligatorio"));
      }

    }).catch(function (error) {
      return res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY).
      send(MessageUtil.getMessage(MessageType.ERROR, CalculatorConstants.ERROR_VALIDACION_OPERACION, HttpStatus.ReasonPhrases.UNPROCESSABLE_ENTITY, 
        "Ocurrio un error al validar el operando : " + error.message));
      });
  }
  catch(exception){
    console.error(exception);
    res.status(HttpStatus.StatusCodes.BAD_REQUEST).
              send(MessageUtil.getMessage(MessageType.ERROR, CalculatorConstants.ERROR_ENVIO_SOLICITUD, HttpStatus.ReasonPhrases.BAD_REQUEST, 
                "Ocurrio un error al tratar de procesar la solicitud :" + exception));
  }
}