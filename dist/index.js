"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpressionOperator = exports.ExpressionGrouper = exports.ExpressionValue = exports.ExpressionToken = exports.Expression = exports.Scope = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Lambda - Make your own calculator
 */
var Lambda = {};
/**
 * Converts part of an expression to a string
 * @callback LambdaStringify
 * @param {string} left The left-hand operand
 * @param {string} [right] The right-hand operand, if it exists
 * @returns {string} The joined string
 */

/**
 * Evaluates a part of an expression
 * @callback LambdaPerform
 * @param {Lambda.ExpressionValue} left The left-hand operand
 * @param {Lambda.ExpressionValue} [right] The right-hand operand, if it exists
 * @returns {*} The result as a Lambda.ExpressionValue. If not an ExpressionValue, this will be implicitly turned into one
 */

/**
 * @typedef {object} LambdaOperatorDescriptor
 * @prop {string} name The name of this operator
 * @prop {string} symbol The symbol for this operator
 * @prop {number} precedence The precedence of this operator. Higher values mean higher precedence.
 * @prop {'L'|'R'} [associativity] The associativity of this operator. Defaults to 'L' for left-associative
 * @prop {LambdaStringify} stringify
 * @prop {LambdaPerform} [perform]
 */

/**
 * Describes a field of math that contains a set of custom operations
 */

var Scope = /*#__PURE__*/function () {
  function Scope() {
    _classCallCheck(this, Scope);

    /**
     * @type {Object<string, Lambda.ExpressionOperator>}
     */
    this.operators = {};
  }
  /**
   * Defines an operator onto this scope
   * @param {LambdaOperatorDescriptor} op An object describing the operator
   */


  _createClass(Scope, [{
    key: "defineOperator",
    value: function defineOperator(op) {
      var operator = new ExpressionOperator(op);
      this.operators[op.name] = operator;
      return operator;
    }
    /**
     * Creates a manipulatable expression
     */

  }, {
    key: "createExpression",
    value: function createExpression() {
      return new Expression(this);
    }
    /**
     * @param {string} name The name of the operator
     * @returns {ExpressionOperator?} The operator or null if not found
     */

  }, {
    key: "getOperator",
    value: function getOperator(name) {
      return this.operators[name] || null;
    }
  }]);

  return Scope;
}();
/**
 * Describes an expression within a scope
 */


exports.Scope = Scope;

var Expression = /*#__PURE__*/function () {
  /**
   * @param {Scope} scope The scope to inherit operators from
   */
  function Expression(scope) {
    _classCallCheck(this, Expression);

    this.scope = scope;
    /**
     * The tokens that make up this expression, read from left to right.
     * @type {ExpressionToken[]}
     */

    this.tokens = [];
    /**
     * The tokens that make up this expression, but in postfix.
     * @type {ExpressionToken[]}
     */

    this.postfix = [];
  }
  /**
   * Writes tokens to the end of the expression
   * @param {...ExpressionToken} tokens The tokens to write
   */


  _createClass(Expression, [{
    key: "write",
    value: function write() {
      var _this$tokens;

      (_this$tokens = this.tokens).push.apply(_this$tokens, arguments);
    }
    /**
     * Converts the infix expression to postfix
     */

  }, {
    key: "shuntingYard",
    value: function shuntingYard() {
      this.postfix = [];

      var tokens = _toConsumableArray(this.tokens);
      /**
       * Retrieves the last element in an array
       * @private
       * @param {T[]} what The array to read from
       * @returns {T} The last element
       * @template T
       */


      var peek = function peek(what) {
        return what[what.length - 1];
      };
      /** @type {ExpressionToken[]} */


      var stack = []; // 1. While there are tokens to be read, read a token

      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i]; // 1a. If the token is a number or a variable, add it to the output queue

        if (token instanceof ExpressionValue) {
          this.postfix.push(token);
          continue;
        } // If a token is a function token...
        // If a token is a function argument separator...
        // 1b. If the token is an operator...


        if (token instanceof ExpressionOperator) {
          // 1bi. While there are operators on the stack...
          while (stack.length) {
            if (!(peek(stack) instanceof ExpressionOperator)) {
              break;
            }
            /** @type {ExpressionOperator} */


            var next = peek(stack); // 1bii. and if the last element is left-associative AND its precedence is less than or equal to the current token...
            // 1biii. ...OR the last element is right-associative AND its precedence is less than the current token

            if (token.associativity === 'L' && token.precedence <= next.precedence || token.associativity === 'R' && token.precedence < next.precedence) {
              // 1biv. ...pop the last element onto the output queue
              this.postfix.push(stack.pop());
            } else {
              break;
            }
          } // 1bv. Push the operator onto the stack


          stack.push(token);
          continue;
        } // 1c. If the token is a left paren, push it onto the stack.


        if (token instanceof ExpressionGrouper && token.associativity === 'L') {
          stack.push(token);
          continue;
        } // 1d. If the token is a right paren...


        if (token instanceof ExpressionGrouper && token.associativity === 'R') {
          var foundMatching = false;

          while (stack.length && !foundMatching) {
            // 1di. pop operators off the stack until a matching parens is found
            var temp = stack.pop();

            if (token instanceof ExpressionGrouper && token.associativity === 'L') {
              foundMatching = true;
            } else {
              this.postfix.push(temp);
            }
          } // (If no matching parens was in the queue, there's a mismatch)


          if (!foundMatching) {
            throw Error("Mismatched parens (missing?)");
          } // 1dii. Pop the left parens from the stack (but not onto the output)


          stack.pop();
          continue;
        }

        throw Error("Unknown token: ".concat(token));
      } // 2. After there are no more tokens to be read AND there are still things in the stack...


      while (stack.length) {
        // 2a. ...pop them to the output queue
        var _temp = stack.pop(); // (If there are parens was in the queue, there's a mismatch)


        if (_temp instanceof ExpressionGrouper) {
          throw Error("Mismatched parens (too many?)");
        }

        this.postfix.push(_temp);
      }
    }
    /**
     * Evaluates this expression given that all of the operators contain a `perform` function.
     * @returns {ExpressionValue}
     */

  }, {
    key: "evaluate",
    value: function evaluate() {
      /** @type {ExpressionValue[]} */
      var stack = []; // If !postfix.length, shuntingYard()

      this.postfix.length || this.shuntingYard();

      for (var i = 0; i < this.postfix.length; i++) {
        var token = this.postfix[i];

        if (token instanceof ExpressionValue) {
          stack.push(token);
          continue;
        }

        if (token instanceof ExpressionOperator) {
          if (token._stringify.length) {
            var l = token._stringify.length;
            /** @type {ExpressionValue[]} */

            var operands = [];

            while (0 < l) {
              var temp = stack.pop();

              if (!temp) {
                console.error(temp);
                throw Error("That's not a number");
              }

              operands.push(temp);
              l--;
            } // console.log(`Performing ${token.name} onto ${operands.length}`)


            var result = token.perform.apply(token, operands);
            stack.push(result instanceof ExpressionValue ? result : new ExpressionValue(result));
          } else {
            console.error(token);
            throw Error("Not implemented");
          }
        }
      }

      return stack[0];
    }
  }, {
    key: "toString",
    value: function toString() {
      // if (this.postfix.length) {
      // } else {
      return this.tokens.join(' '); // }
    }
  }]);

  return Expression;
}();

exports.Expression = Expression;

var ExpressionToken = /*#__PURE__*/function () {
  /**
   * @param {*} value A representation of this token
   */
  function ExpressionToken(value) {
    _classCallCheck(this, ExpressionToken);

    this.value = value;
  }

  _createClass(ExpressionToken, [{
    key: "toString",
    value: function toString() {
      return this.value;
    }
  }]);

  return ExpressionToken;
}();

exports.ExpressionToken = ExpressionToken;

var ExpressionValue = /*#__PURE__*/function (_ExpressionToken) {
  _inherits(ExpressionValue, _ExpressionToken);

  var _super = _createSuper(ExpressionValue);

  /**
   * @param {*} value The value of this token
   */
  function ExpressionValue(value) {
    _classCallCheck(this, ExpressionValue);

    return _super.call(this, value);
  }

  _createClass(ExpressionValue, [{
    key: "toString",
    value: function toString() {
      return this.value;
    }
  }]);

  return ExpressionValue;
}(ExpressionToken);

exports.ExpressionValue = ExpressionValue;

var ExpressionGrouper = /*#__PURE__*/function (_ExpressionToken2) {
  _inherits(ExpressionGrouper, _ExpressionToken2);

  var _super2 = _createSuper(ExpressionGrouper);

  /**
   * @param {"("|")"|"["|"]"|"{"|"}"} value The grouper
   */
  function ExpressionGrouper(value) {
    var _this;

    _classCallCheck(this, ExpressionGrouper);

    _this = _super2.call(this, value);
    /** @type {'L'|'R'} */

    _this.associativity = /[\(\[\{]/.test(value) ? 'L' : 'R';
    return _this;
  }

  return ExpressionGrouper;
}(ExpressionToken);

exports.ExpressionGrouper = ExpressionGrouper;

var ExpressionOperator = /*#__PURE__*/function (_ExpressionToken3) {
  _inherits(ExpressionOperator, _ExpressionToken3);

  var _super3 = _createSuper(ExpressionOperator);

  /**
   * @param {LambdaOperatorDescriptor} op An object describing the operator
   */
  function ExpressionOperator(op) {
    var _this2;

    _classCallCheck(this, ExpressionOperator);

    _this2 = _super3.call(this, op.symbol || '.');
    _this2.name = op.name;
    _this2.symbol = op.symbol || '.';
    _this2.associativity = op.associativity || 'L';
    _this2.precedence = op.precedence;
    _this2.perform = op.perform;
    /** @type {LambdaStringify} */

    _this2._stringify = op.stringify || function () {
      Array.from(arguments).join(this.symbol);
    };

    return _this2;
  }

  _createClass(ExpressionOperator, [{
    key: "stringify",
    value: function stringify() {
      return this._stringify.apply(this, arguments);
    }
  }]);

  return ExpressionOperator;
}(ExpressionToken);

exports.ExpressionOperator = ExpressionOperator;