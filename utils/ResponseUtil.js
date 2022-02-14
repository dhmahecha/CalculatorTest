'use strict'

var Respuesta = require('../models/respuesta');
var DateUtil = require('./dateUtil');

module.exports = class ResponseUtil {

  /**
   * 
   * @param {*} messages recibe un objeto de tipo Mensaje o un arreglo del mismo tipo.
   * @param {*} results recibe un objeto con el resultado o un arreglo de de resultados del mismo tipo de objeto.
   */
  constructor(messages, results){
    this.messages = messages;
    this.results = results;
  }

  /**
   * Obtiene la estructura de la respuesta.
   * @returns 
   */
  getResponse() {
    var dateUtil = new DateUtil;
    var respuesta = new Respuesta();
    var totalRecords = 0;

    if(this.results != null && this.results != undefined){
      var resultados = this.getResults();
      totalRecords = resultados.length;
      respuesta.resultados = resultados;
      respuesta.totalRegistros = totalRecords;
    }
    respuesta.estampaTiempo = dateUtil.getFormatCurrentDate();
 
    if(this.messages != null && this.messages != undefined){    
      respuesta.mensajes = this.getMessages();
    }
    return respuesta;
  }

  /**
   * retorna un arreglo de mensajes
   * @returns {Array} mensajes
   */
  getMessages(){
    return this.getStructure(this.messages);
  }
  /**
   * retorna un arreglo de resultados
   * @returns {Array} resultados
   */
  getResults(){
    return this.getStructure(this.results);
  }

  /**
   * Formatea una estructura de resultados.
   * @param {Array} scheme 
   * @returns 
   */
  getStructure(scheme){
    var estructura = new Array();
    if(Array.isArray(scheme)){
      estructura = scheme;
    }
    else{
      estructura.push(scheme);
    }
    return estructura;
  }
}