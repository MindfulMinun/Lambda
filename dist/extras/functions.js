"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factorial = factorial;
exports.exp = exp;
exports.pow = pow;

var _value = require("./value.js");

/**
 * Calculates the factorial of n.
 * @param {number} n The number to factorial-ize
 * @returns {number} The factorial of n
 */
function factorial(n) {
  // TODO Convert to bigints?
  if (200 < n) return Infinity;
  if (n < 0) return -1;
  if (n === 0) return 1;
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
/**
 * Approximates e^x
 * @param {number|Scalar} x The argument
 * @returns {Scalar} The result of raising e to the power of x
 */


function exp(x) {
  if (!(x instanceof _value.Scalar)) {
    return new _value.Scalar(Math.exp(x));
  }

  if (!x.hasComplexPart) {
    return exp(x.real);
  } // (e^a * cos(b)) + (e^a * sin(b)) i


  var eA = exp(x.real).real;
  var real = eA * Math.cos(x.complex);
  var complex = eA * Math.sin(x.complex);
  return new _value.Scalar(real, complex);
}
/**
 * Takes the power of a number
 * @param {number|Scalar} base
 * @param {number|Scalar} exponent
 * @returns {Scalar}
 */


function pow(base, exponent) {
  if (exponent instanceof _value.Scalar) {
    if (exponent.hasComplexPart) {
      throw Error("Not implemented, use exp() instead");
    } else {
      return pow(base, exponent.real);
    }
  }

  if (!(base instanceof _value.Scalar)) {
    return new _value.Scalar(Math.pow(base, exponent));
  } // (a + bi)^N = (r^N * cos(N\theta)) + (sin(N\theta))i
  // where n's the exponent
  // where r's the magnitude of the complex number
  // where \theta's the angle w/ respect to the x-axis


  var mag = Math.sqrt(Math.pow(base.real, 2) + Math.pow(base.complex, 2));
  var theta = Math.atan(base.complex / base.real);
  var real = Math.pow(base.real, exponent) * Math.cos(mag * theta);
  var complex = Math.sin(mag * theta);
  return new _value.Scalar(real, complex);
}