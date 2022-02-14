'use strict'
module.exports = class DateUtil {

  constructor(){

  }

  /**
   * Obtiene la fecha actual formateada.
   * @returns 
   */
  getFormatCurrentDate() {
    var date = new Date();    
    date = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    return date.toISOString();
  }
}
