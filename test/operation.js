'use strict';
var SessionService = require('../services/session');
var OperationService = require('../services/operation');
var Service = require('../models/sesion');
const dotenv = require('dotenv');
const assert = require('assert').strict;
const { v4: uuidv4 } = require('uuid');
dotenv.config();


var res = {};
var next = {};

describe('Test Operations', function() {
        it('Instancia la operación Addition', function(done) {
            try {
                var req = {};
                req.body = {operation : 'Addition'};
                var id = "d5908d8e-ba73-457c-98e9-983f9b2242aa";
                SessionService.getValueByKey(id).then((results) => {
                    var array = Array.from(results.value);
                    OperationService.instantiateOperation(req,res,next,array).then((results) => {
                        assert.equal(20,results);
                    }).catch(function (error) {
                        done(error);
                    }); 
                }).catch(function (error) {
                    done(error);
                }); 
            } catch(err) {
                done(err);
            }
            done();
        });

        it('Instancia la operación Substraction', function(done) {
            try {
                var req = {};
                req.body = {operation : 'Substraction'};
                var id = "d5908d8e-ba73-457c-98e9-983f9b2242aa";
                SessionService.getValueByKey(id).then((results) => {
                    var array = Array.from(results.value);
                    OperationService.instantiateOperation(req,res,next,array).then((results) => {
                        assert.equal(-10,results);
                    }).catch(function (error) {
                        done(error);
                    }); 
                }).catch(function (error) {
                    done(error);
                }); 
            } catch(err) {
                done(err);
            }
            done();
        });        

        it('Instancia la operación Multiplication', function(done) {
            try {
                var req = {};
                req.body = {operation : 'Multiplication'};
                var id = "d5908d8e-ba73-457c-98e9-983f9b2242aa";
                SessionService.getValueByKey(id).then((results) => {
                    var array = Array.from(results.value);
                    OperationService.instantiateOperation(req,res,next,array).then((results) => {
                        assert.equal(560,results);
                    }).catch(function (error) {
                        done(error);
                    }); 
                }).catch(function (error) {
                    done(error);
                }); 
            } catch(err) {
                done(err);
            }
            done();
        });  

        it('Instancia la operación Division', function(done) {
            try {
                var req = {};
                req.body = {operation : 'Division'};
                var id = "d5908d8e-ba73-457c-98e9-983f9b2242aa";
                SessionService.getValueByKey(id).then((results) => {
                    var array = Array.from(results.value);
                    OperationService.instantiateOperation(req,res,next,array).then((results) => {
                        assert.equal(0.044642857142857144,results);
                    }).catch(function (error) {
                        done(error);
                    }); 
                }).catch(function (error) {
                    done(error);
                }); 
            } catch(err) {
                done(err);
            }
            done();
        });  

        it('Instancia la operación Power', function(done) {
            try {
                var req = {};
                req.body = {operation : 'Power'};
                var id = "d5908d8e-ba73-457c-98e9-983f9b2242aa";
                SessionService.getValueByKey(id).then((results) => {
                    var array = Array.from(results.value);
                    OperationService.instantiateOperation(req,res,next,array).then((results) => {
                        assert.equal(1.9259299443872357e+78,results);
                    }).catch(function (error) {
                        done(error);
                    }); 
                }).catch(function (error) {
                    done(error);
                }); 
            } catch(err) {
                done(err);
            }
            done();
        });  


        it('Instancia la operación Division donde un elemento es 0', function(done) {
            try {
                var req = {};
                req.body = {operation : 'Division'};
                var id = "d5908d8e-ba73-457c-98e9-983f9b2242aa";
                SessionService.getValueByKey(id).then((results) => {
                    var array = Array.from(results.value);
                    array.push(0);
                    OperationService.instantiateOperation(req,res,next,array).then((results) => {
                        assert.equal(Infinity,results);
                    }).catch(function (error) {
                        done(error);
                    }); 
                }).catch(function (error) {
                    done(error);
                }); 
            } catch(err) {
                done(err);
            }
            done();
        });     
        
        it('Instancia la operación potenciación para un negativo con exponente real', function(done) {
            try {
                var req = {};
                req.body = {operation : 'Power'};
                var id = "d5908d8e-ba73-457c-98e9-983f9b2242aa";
                SessionService.getValueByKey(id).then((results) => {
                    var array = new Array();
                    array.push(-2);
                    array.push(1/3);
                    OperationService.instantiateOperation(req,res,next,array).then((results) => {
                        assert.equal(NaN,results);
                    }).catch(function (error) {
                        done(error);
                    }); 
                }).catch(function (error) {
                    done(error);
                }); 
            } catch(err) {
                done(err);
            }
            done();
        });            


   });
   