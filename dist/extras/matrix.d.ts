export class Matrix extends Value {
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
    constructor(rows: number, columns: number, values?: (number | Scalar)[]);
    rows: number;
    columns: number;
    /**
     * The elements in this matrix
     * @type {Scalar[]}
     */
    values: Scalar[];
    /**
     * Gets the offset of a cell in a matrix given its row and column accessors
     * @param {number} row The row of the cell to access. Count starts at 0.
     * @param {number} column The column of the cell to access. Count starts at 0.
     * @returns {number} The offset, use as an accessor of a 1d array
     * @author MindfulMinun
     * @since 2020-02-23
     * @version 1.0.0
     */
    _offset(row: number, column: number): number;
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
    get(row: number, column: number): Scalar;
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
    set(row: number, column: number, value: number | Scalar): boolean;
    _determinant: number;
    /**
     * Performs matrix multiplication (Naive algorithm)
     * @param {Matrix} matrix The matrix to multiply with. `this` is left-multiplied with `matrix`
     * @returns {Matrix} The result of the multiplication, or a Value containing an `error` property if multiplication isn't possible
     * @author MindfulMinun
     * @since 2020-05-12
     * @version 1.0.0
     */
    multiply(matrix: Matrix): Matrix;
}
import { Value } from "./value.js";
import { Scalar } from "./value.js";
