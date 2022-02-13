'use strict'
// Cargamos los modelos para usarlos posteriormente
var Sesion = require('../models/sesion');
const { v4: uuidv4 } = require('uuid');
var mc = require('memjs');
var DateUtil = require('../utils/DateUtil');

var mc = mc.Client.create(process.env.MEMCACHED_HOST, {
  username: process.env.MEMCACHED_USERNAME,
  password: process.env.MEMCACHED_PASSWORD
}); 

/**
 * Se hace conexión a memcache, se crea un nuevo key para
 * almacenar un conjuto de valores.
 * @param {*} req 
 * @param {*} person 
 */
exports.getSession = function(req){
  try{
    var id = uuidv4();
    mc.set(id, process.env.MEMCACHED_VALUE_DEFAULT, {expires:0}, function(err, val) {
      if(err != null) {
        console.log('Ocurrio un error al tratar de obtener la sesión: ' + err)
        throw err
      }
    });

    var dateUtil = new DateUtil();

    exports.getValueByKey(id).catch(err => console.error(err));
    var sesion = new Sesion(); 
    sesion.id = id;
    sesion.fecha = dateUtil.getFormatCurrentDate();

    return sesion;
  }
  catch(ex){
    console.log(ex.message);
    throw ex;
  }
} 

/**
 * Dado el identificador de a sesión, se obtiene la 
 * data almacenada
 * @param {*} id 
 * @returns 
 */
exports.getValueByKey = async function(id){
  try{
    return mc.get(id);
  }
  catch(ex){
    console.error(ex.message)
    throw new Error(ex.message);
  }    
}