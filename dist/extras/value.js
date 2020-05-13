"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scalar = exports.Value = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Represents a mathematical quantity. Could be a boolean, a scalar, a matrix, or whatever you want it to be.
 * @author MindfulMinun
 * @since 2020-05-12
 * @version 1.0.0
 */
var Value = /*#__PURE__*/function () {
  function Value() {
    _classCallCheck(this, Value);

    this.value = null;
    this.error = null;
  }

  _createClass(Value, [{
    key: "hasError",
    value: function hasError() {
      return !!this.error;
    }
  }]);

  return Value;
}();
/**
 * Represents a number, could have a complex part.
 * @author MindfulMinun
 * @since 2020-05-12
 * @version 1.0.0
 */


exports.Value = Value;

var Scalar = /*#__PURE__*/function (_Value) {
  _inherits(Scalar, _Value);

  var _super = _createSuper(Scalar);

  /**
   * @param {number} real The real part
   * @param {number} [complex] The complex part
   */
  function Scalar(real, complex) {
    var _this;

    _classCallCheck(this, Scalar);

    _this = _super.call(this);
    /** Represents the real part of the number */

    _this.real = real;
    /** Represents the complex part of the number */

    _this.complex = 0;
    /** Whether this scalar has a complex part or not */
    // this.hasComplexPart = false

    if (complex != null) {
      _this.complex = complex; // this.hasComplexPart = true
    }

    return _this;
  }
  /**
   * Adds two scalars
   * @param {Scalar} addend The scalar to add
   * @returns {Scalar} The sum of these two scalars
   */


  _createClass(Scalar, [{
    key: "add",
    value: function add(addend) {
      var real = this.real + addend.real;

      if (this.hasComplexPart || addend.hasComplexPart) {
        return new Scalar(real, this.complex + addend.complex);
      }

      return new Scalar(real);
    }
    /**
     * Multiplies two scalars
     * @param {Scalar} factor The scalar to multiply by
     * @returns {Scalar} The product of these two scalars
     */

  }, {
    key: "multiply",
    value: function multiply(factor) {
      // Multiplication of complex numbers
      // (a + bi) * (c + di) = (ac - bd) + (ad + bc)i
      var real = this.real * factor.real - this.complex * factor.complex;

      if (this.hasComplexPart || factor.hasComplexPart) {
        var complex = this.real * factor.complex + this.complex * factor.real;
        return new Scalar(real, complex);
      }

      return new Scalar(real);
    }
    /**
     * Divides this scalar by another
     * @param {Scalar} divisor The scalar to divide by
     * @returns {Scalar} The quotient of these two scalars
     */

  }, {
    key: "division",
    value: function division(divisor) {
      // If neither component has a complex part, just do regular division
      if (!this.hasComplexPart && !divisor.hasComplexPart) {
        return new Scalar(this.real / divisor.real);
      } // https://mathworld.wolfram.com/ComplexDivision.html
      // Real: ((ac + bd) / (c^2 + d^2))
      // Complex: ((bc - ad) / (c ^ 2 + d ^ 2) i)


      var real = (this.real * divisor.real + this.complex * divisor.complex) / (Math.pow(divisor.real, 2) + Math.pow(divisor.complex, 2));
      var complex = (this.complex * divisor.real - this.real * divisor.complex) / (Math.pow(divisor.real, 2) + Math.pow(divisor.complex, 2));
      return new Scalar(real, complex);
    } // conjugate()

  }, {
    key: "toString",
    // TODO: Implement the following methods to mimic those on `number`
    // [x] toString
    // [x] toFixed
    // [x] toExponential
    // [ ] toPrecision
    // [x] valueOf

    /**
     * Converts this complex number to a string
     * @param {number} [radix] 
     * @returns {string} The 
     */
    value: function toString() {
      var radix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

      if (this.hasComplexPart) {
        return "".concat(this.real.toString(radix), " ").concat(this.complex === Math.abs(this.complex) ? '+' : '-', " ").concat(Math.abs(this.complex).toString(radix), "i");
      }

      return this.real.toString(radix);
    }
    /**
     * Scalar to fixed-point
     * @param {number} digits The number of digits to show
     * @returns {string} The scalar in fixed point
     */

  }, {
    key: "toFixed",
    value: function toFixed() {
      var digits = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;

      if (this.hasComplexPart) {
        return "".concat(this.real.toFixed(digits), " ").concat(this.complex === Math.abs(this.complex) ? '+' : '-', " ").concat(Math.abs(this.complex).toFixed(digits), "i");
      }

      return this.real.toFixed(digits);
    }
    /**
     * Scalar to scientific notation
     * @param {number} digits The number of digits to show
     * @returns {string} The scalar in scientific notation
     */

  }, {
    key: "toExponential",
    value: function toExponential(digits) {
      if (this.hasComplexPart) {
        return "".concat(this.real.toExponential(digits), " ").concat(this.complex === Math.abs(this.complex) ? '+' : '-', " ").concat(Math.abs(this.complex).toExponential(digits), "i");
      }

      return this.real.toExponential(digits);
    }
    /**
     * Scalar to precision
     * @param {number} digits The number of digits to show
     * @returns {string} The scalar in the given precision
     */

  }, {
    key: "toPrecision",
    value: function toPrecision(digits) {
      if (this.hasComplexPart) {
        return "".concat(this.real.toPrecision(digits), " ").concat(this.complex === Math.abs(this.complex) ? '+' : '-', " ").concat(Math.abs(this.complex).toPrecision(digits), "i");
      }

      return this.real.toPrecision(digits);
    }
    /**
     * Converts this number to a JavaScript number by taking its magnitude.
     * @returns {number}
     */

  }, {
    key: "valueOf",
    value: function valueOf() {
      if (!this.hasComplexPart) {
        return this.real;
      }

      return Math.sqrt(Math.pow(this.real, 2) + Math.pow(this.complex, 2));
    }
  }, {
    key: "hasComplexPart",
    get: function get() {
      return this.complex !== 0;
    }
  }]);

  return Scalar;
}(Value);

exports.Scalar = Scalar;