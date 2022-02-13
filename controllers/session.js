'use strict'

// Cargamos los controladores para usarlos posteriormente
var SessionService = require('../services/session');
const messageType = require('../enums/MessageType'); 
var ResponseUtil = require('../utils/ResponseUtil');
var MessageUtil = require('../utils/MessageUtil');
var HttpStatus = require('http-status-codes');

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
      return res.status(HttpStatus.StatusCodes.BAD_REQUEST).
              send(MessageUtil.getMessage(messageType.ERROR, 30002, HttpStatus.ReasonPhrases.BAD_REQUEST, 
                "Ocurrio un error al tratar de obtener la sesión : " + error.message));
    });
  }
  catch(exception){
    console.error(exception.message());
    res.status(HttpStatus.StatusCodes.BAD_REQUEST).
              send(MessageUtil.getMessage(messageType.ERROR, 30001, HttpStatus.ReasonPhrases.BAD_REQUEST, 
                "Ocurrio un error al tratar de procesar la solicitud :" + exception.message()));
  }
}