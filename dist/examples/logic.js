"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Lambda = _interopRequireWildcard(require("../index.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Predicate logic
var logic = new Lambda.Scope();
logic.defineOperator({
  name: 'Negation',
  symbol: '!',
  stringify: function stringify(operator) {
    return "\\lnot ".concat(operator);
  },
  perform: function perform(op) {
    return !op.value;
  },
  precedence: 5
});
logic.defineOperator({
  name: 'Conjunction',
  symbol: '^',
  stringify: function stringify(left, right) {
    return "".concat(left, " \\land ").concat(right);
  },
  perform: function perform(left, right) {
    return left.value && right.value;
  },
  precedence: 4
});
logic.defineOperator({
  name: 'Disjunction',
  symbol: '+',
  stringify: function stringify(left, right) {
    return "".concat(left, " \\lor ").concat(right);
  },
  perform: function perform(left, right) {
    return left.value || right.value;
  },
  precedence: 3
});
logic.defineOperator({
  name: 'Conditional',
  symbol: '->',
  stringify: function stringify(left, right) {
    return "".concat(left, " \\rarr ").concat(right);
  },
  perform: function perform(left, right) {
    return !left.value || right.value;
  },
  precedence: 2
});
logic.defineOperator({
  name: 'Biconditional',
  symbol: '<->',
  stringify: function stringify(left, right) {
    return "".concat(left, " \\iff ").concat(right);
  },
  perform: function perform(left, right) {
    return left.value === right.value;
  },
  precedence: 1
});
var expr = logic.createExpression();
expr.write(new Lambda.ExpressionValue(true), logic.getOperator('Conjunction'), logic.getOperator('Negation'), new Lambda.ExpressionValue(false));
expr.shuntingYard();
console.log(expr.toString()); // T ^ !F

console.log(expr.evaluate());