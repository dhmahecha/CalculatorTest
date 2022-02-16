'use strict';
var OperandService = require('../services/operand');
var SessionService = require('../services/session');
const dotenv = require('dotenv');
const assert = require('assert').strict;
const { v4: uuidv4 } = require('uuid');
dotenv.config();


var res = {};
var next = {};

describe('Test Operands', function() {
        it('Instancia la operación Add Operand', function(done) {
            try {
                var min = 0;
                var max = 10000000000;
                var number = Math.random() * (max - min) + min;
                var id = "66efb3c5-850c-498f-862b-20b5e182b7b5";
                SessionService.getValueByKey(id).then((results) => {
                    var arrayOperand = OperandService.addOperand(id, results.value, number);
                    var service = SessionService.getValueByKey(id);
                    service.then((results) => {
                        assert.equal(arrayOperand, Array.from(results.value));
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
   