'use strict'

var Mensaje = require('../models/mensaje');

module.exports = class MessageUtil {

  /**
   * 
   * @param {*} type 
   * @param {*} code 
   * @param {*} message 
   * @param {*} description 
   */
  constructor(){

  }

  /**
   * Genera la estructura de un mensaje. 
   * @param {String} type 
   * @param {Number} code 
   * @param {String} message 
   * @param {String} description 
   * @returns 
   */
  static getMessage(type, code, message, description){
    var mensaje = new Mensaje();
    mensaje.tipo = type;
    mensaje.codigo = code;
    mensaje.mensaje = message;
    mensaje.descripcion = description;
    return mensaje;
  }
}
