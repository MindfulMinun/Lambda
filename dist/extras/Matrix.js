"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Matrix = void 0;

var _value = require("./value.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Matrix = /*#__PURE__*/function (_Value) {
  _inherits(Matrix, _Value);

  var _super = _createSuper(Matrix);

  /**
   * Represents a vector or matrix (the kind in linear algebra)
   * 
   * @param {number} rows The number of rows in this matrix
   * @param {number} columns The number of columns in this matrix
   * @param {(number|Scalar)[]} [values] The values of this matrix, in row-major order. 
   * @author MindfulMinun
   * @since 2020-05-12
   * @version 1.0.0
   */
  function Matrix(rows, columns, values) {
    var _this;

    _classCallCheck(this, Matrix);

    _this = _super.call(this);
    _this.rows = rows;
    _this.columns = columns;

    if (!values || !values.length) {
      return _possibleConstructorReturn(_this, new Matrix(rows, columns, Array.from({
        length: rows * columns
      }).fill(new _value.Scalar(0))));
    }

    if (values.length !== rows * columns) {
      throw Error("Incorrect number of elements: for a ".concat(rows, " by ").concat(columns, " matrix, there should be ").concat(rows * columns, " elements, not ").concat(values.length));
    }
    /**
     * The elements in this matrix
     * @type {Scalar[]}
     */


    _this.values = values.slice().map(function (value) {
      return value instanceof _value.Scalar ? value : new _value.Scalar(value);
    });
    return _this;
  }
  /**
   * Gets the offset of a cell in a matrix given its row and column accessors
   * @param {number} row The row of the cell to access. Count starts at 0.
   * @param {number} column The column of the cell to access. Count starts at 0.
   * @returns {number} The offset, use as an accessor of a 1d array
   * @private
   * @author MindfulMinun
   * @since 2020-02-23
   * @version 1.0.0
   */


  _createClass(Matrix, [{
    key: "_offset",
    value: function _offset(row, column) {
      return row * this.columns + column;
    }
    /**
     * Gets the value at a cell of a matrix.
     * @param {number} row The row of the cell to access.
     * @param {number} column The column of the cell to access.
     * @returns {Scalar} The value at that cell
     * @throws Throws if index out of bounds
     * @author MindfulMinun
     * @since 2020-02-23
     * @version 1.0.0
     */

  }, {
    key: "get",
    value: function get(row, column) {
      var offset = this._offset(row, column);

      if (offset > this.values.length) {
        throw Error("Out of bounds: tried to access element at ".concat(row, ", ").concat(column, " of a ").concat(this.rows, " by ").concat(this.columns, " matrix"));
      }

      return this.values[offset];
    }
    /**
     * Sets the value at a cell of a matrix.
     * @param {number} row The row of the matrix.
     * @param {number} column The column of the matrix.
     * @param {number|Scalar} value The value you wish to write
     * @returns {boolean} Whether the assignment was successful.
     * @author MindfulMinun
     * @since 2020-02-23
     * @version 1.0.0
     */

  }, {
    key: "set",
    value: function set(row, column, value) {
      var offset = this._offset(row, column);

      if (offset > this.values.length) {
        return false;
      }

      return Reflect.set(this.values, offset, value instanceof _value.Scalar ? value : new _value.Scalar(value));
    }
    /**
     * Performs matrix multiplication (Naïve algorithm)
     * @param {Matrix} matrix The matrix to multiply with. `this` is left-multiplied with `matrix`
     * @returns {Matrix} The result of the multiplication, or a Value containing an `error` property if multiplication isn't possible
     * @author MindfulMinun
     * @since 2020-05-12
     * @version 1.0.0
     */

  }, {
    key: "multiply",
    value: function multiply(matrix) {
      if (this.columns !== matrix.rows) {
        return null;
      }

      var out = new Matrix(this.rows, matrix.columns); // Multiplication for matrix A(n,m) and matrix B(m, p), then C has dimensions m, p:
      // Its entries are as follows:
      // C[i, j] = \sum_{k = 1}^{m} A[i,k] * B[k,j]
      // Iterate over every cell in the new matrix C

      for (var i = 0; i < out.rows; i++) {
        for (var j = 0; j < out.columns; j++) {
          var sum = new _value.Scalar(0); // Summation

          for (var k = 1; k <= this.columns; k++) {
            sum = sum.add(this.get(i, k).multiply(matrix.get(k, j)));
          }

          out.set(i, j, sum);
        }
      }

      return out;
    }
  }]);

  return Matrix;
}(_value.Value);

exports.Matrix = Matrix;
var A = new Matrix(3, 5, [3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5]);
var B = new Matrix(5, 3, [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 6, 7]); // console.log(A.toString('wa'))
// console.log(B.toString('wa'))

console.log(A.multiply(B).toString());