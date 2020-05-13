"use strict";

var _value = require("../extras/value.js");

var _functions = require("../extras/functions.js");

var pi = new _value.Scalar(Math.PI);
var i = new _value.Scalar(0, 1);
var result = (0, _functions.exp)(pi.multiply(i));
console.log("e^{pi * i} = ".concat(result.toFixed(3)));