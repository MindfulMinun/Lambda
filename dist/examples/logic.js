"use strict";

var _index = _interopRequireDefault(require("../index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Predicate logic
var logic = new _index["default"].Scope();
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
expr.write(new _index["default"].ExpressionValue(true), logic.getOperator('Conjunction'), logic.getOperator('Negation'), new _index["default"].ExpressionValue(false));
expr.shuntingYard();
console.log(expr.toString()); // T ^ !F

console.log(expr.evaluate());