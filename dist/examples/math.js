"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Lambda = _interopRequireWildcard(require("../index.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Basic Math
var math = new Lambda.Scope();
math.defineOperator({
  name: 'Exponentiation',
  symbol: '^',
  associativity: 'R',
  stringify: function stringify(base, exponent) {
    return "(".concat(base, ")^(").concat(exponent, ")");
  },
  perform: function perform(base, exponent) {
    return Math.pow(base.value, exponent.value);
  },
  precedence: 3
});
math.defineOperator({
  name: 'Multiplication',
  symbol: '*',
  stringify: function stringify(left, right) {
    return "(".concat(left, ") \\times (").concat(right, ")");
  },
  perform: function perform(left, right) {
    return left.value * right.value;
  },
  precedence: 2
});
math.defineOperator({
  name: 'Division',
  symbol: '*',
  stringify: function stringify(num, denom) {
    return "\\lfrac{".concat(num, "}{").concat(denom, "}");
  },
  perform: function perform(num, denom) {
    return num.value / denom.value;
  },
  precedence: 2
});
math.defineOperator({
  name: 'Addition',
  symbol: '+',
  stringify: function stringify(left, right) {
    return "(".concat(left, ") + (").concat(right, ")");
  },
  perform: function perform(left, right) {
    return left.value + right.value;
  },
  precedence: 1
});
math.defineOperator({
  name: 'Subtraction',
  symbol: '-',
  stringify: function stringify(left, right) {
    return "(".concat(left, ") - (").concat(right, ")");
  },
  perform: function perform(left, right) {
    return left.value - right.value;
  },
  precedence: 1
});
var expr = math.createExpression();
expr.write( // new Lambda.ExpressionGrouper('('),
new Lambda.ExpressionValue(4), math.getOperator('Addition'), new Lambda.ExpressionValue(3), math.getOperator('Multiplication'), new Lambda.ExpressionValue(4));
expr.shuntingYard();
console.log(expr.toString());
console.log(expr.evaluate());