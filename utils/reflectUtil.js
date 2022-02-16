'use strict'

module.exports = class ReflectUtil {

    /**
     * 
     */
    constructor(){
    
    }

    /**
     * 
     * @param {*} strClass 
     * @returns 
     */
    newInstance(strClass) {
        var args = Array.prototype.slice.call(arguments, 1);
        var clsClass = eval(strClass);
        function F() {
            return new clsClass;
        }
        F.prototype = clsClass.prototype;
        return new F();
    }

}