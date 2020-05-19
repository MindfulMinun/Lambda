"use strict";

var _matrix = require("../extras/matrix.js");

// Matrix multiplication
var A = new _matrix.Matrix(3, 5, [3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5]);
var B = new _matrix.Matrix(5, 3, [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 6, 7]);
console.log("".concat(A.rows, "x").concat(A.columns, " times ").concat(B.rows, "x").concat(B.columns, " matrix:"));
console.log(A.multiply(B).toString());