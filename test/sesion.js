'use strict';
var SessionService = require('../services/session');
var Service = require('../models/sesion');
const dotenv = require('dotenv');
const assert = require('assert').strict;
const { v4: uuidv4 } = require('uuid');
dotenv.config();


var req = {};
req.body = {};
var res = {};
var next = {};

describe('Test Session', function() {
        it('crea una nueva sesión', function(done) {
            try {
                var respuesta = SessionService.getSession(req);
                assert.ok(typeof respuesta.id === 'string');
            } catch(err) {
                done(err);
            }
            done();
        });

       it('obtiene una sesion existente', function(done) {
            SessionService.getValueByKey("fbd5ef3f-da20-4541-9ddc-9a049e79ced2")
            .then((results) => {
                assert.notEqual(results, undefined);
            }).catch(function (error) {
                done(error);
            });   
            done();
        });

        it('Trata de obtener una sesion inexistente', function(done) {
            SessionService.getValueByKey("1234").then((results) => {
                assert.equal(results.value, null);
            }).catch(function (error) {
                done(error);
            });   
            done();
        });

        it('Crea una sesión y verifica que haya sido correctamente persistida', function(done) {
            try {
                var respuesta = SessionService.getSession(req);
                SessionService.getValueByKey(respuesta.id).then((results) => {
                    var array = Array.from(results.value);
                    assert.ok(Array.isArray(array));
                }).catch(function (error) {
                    done(error);
                }); 
            } catch(err) {
                done(err);
            }
            done();
        });
   });
