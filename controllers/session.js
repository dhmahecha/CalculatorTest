'use strict'

// Cargamos los controladores para usarlos posteriormente
var SessionService = require('../services/session');
const MessageType = require('../enums/messageType'); 
var ResponseUtil = require('../utils/responseUtil');
var MessageUtil = require('../utils/messageUtil');
var HttpStatus = require('http-status-codes');
var CalculatorConstants = require('../constants/calculatorConstants');

/**
 * Se obtiene una nueva sesión
 * @param {*} req 
 * @param {*} res 
 */
exports.getNewSession = function(req, res, next){
  try
  {
    var sesion = SessionService.getSession(req);
    var service = SessionService.getValueByKey(sesion.id);
    service.then((results) => {
        var responseUtil = new ResponseUtil(null, sesion);
        var respuesta = responseUtil.getResponse();
        return res.json(respuesta); 
    }).catch(function (error) {
      return res.status(HttpStatus.StatusCodes.NOT_FOUND).
              send(MessageUtil.getMessage(MessageType.ERROR, CalculatorConstants.ERROR_OBTENIENDO_SESION, HttpStatus.ReasonPhrases.NOT_FOUND, 
                "Ocurrio un error obteniendo la sesión: " + error.message));
    });
  }
  catch(exception){
    console.error(exception.message());
    res.status(HttpStatus.StatusCodes.BAD_REQUEST).
              send(MessageUtil.getMessage(MessageType.ERROR, CalculatorConstants.ERROR_ENVIO_SOLICITUD, HttpStatus.ReasonPhrases.BAD_REQUEST, 
                "Ocurrio un error al tratar de procesar la solicitud :" + exception.message()));
  }
}