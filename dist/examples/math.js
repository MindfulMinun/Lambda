"use strict";

var _index = _interopRequireDefault(require("../index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Basic Math
var math = new _index["default"].Scope();
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
new _index["default"].ExpressionValue(4), math.getOperator('Addition'), new _index["default"].ExpressionValue(3), math.getOperator('Multiplication'), new _index["default"].ExpressionValue(4));
expr.shuntingYard();
console.log(expr.toString());
console.log(expr.evaluate());