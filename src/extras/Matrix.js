import { Value, Scalar } from './value.js'

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
    constructor(rows, columns, values) {
        super()
        this.rows = rows
        this.columns = columns

        if (!values || !values.length) {
            return new Matrix(rows, columns, Array.from({length: rows * columns}).fill(new Scalar(0)))
        }

        if (values.length !== rows * columns) {
            throw Error(`Incorrect number of elements: for a ${rows} by ${columns} matrix, there should be ${rows * columns} elements, not ${values.length}`)
        }

        /**
         * The elements in this matrix
         * @type {Scalar[]}
         */
        this.values = values
            .slice()
            .map(value => value instanceof Scalar ? value : new Scalar(value))
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
    _offset(row, column) {
        return (row * this.columns) + column
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
    get(row, column) {
        const offset = this._offset(row, column)
        if (offset > this.values.length) {
            throw Error(`Out of bounds: tried to access element at ${row}, ${column} of a ${this.rows} by ${this.columns} matrix`)
        }
        return this.values[offset]
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
    set(row, column, value) {
        const offset = this._offset(row, column)
        if (offset > this.values.length) {
            return false
        }
        return Reflect.set(this.values, offset, (
            value instanceof Scalar ? value : new Scalar(value)
        ))
    }

    /**
     * Performs matrix multiplication (Naïve algorithm)
     * @param {Matrix} matrix The matrix to multiply with. `this` is left-multiplied with `matrix`
     * @returns {Matrix} The result of the multiplication, or a Value containing an `error` property if multiplication isn't possible
     * @author MindfulMinun
     * @since 2020-05-12
     * @version 1.0.0
     */
    multiply(matrix) {
        if (this.columns !== matrix.rows) {
            return null
        }

        const out = new Matrix(this.rows, matrix.columns)

        // Multiplication for matrix A(n,m) and matrix B(m, p), then C has dimensions m, p:
        // Its entries are as follows:
        // C[i, j] = \sum_{k = 1}^{m} A[i,k] * B[k,j]

        // Iterate over every cell in the new matrix C
        for (let i = 0; i < out.rows; i++) {
            for (let j = 0; j < out.columns; j++) {
                let sum = new Scalar(0)

                // Summation
                for (let k = 1; k <= this.columns; k++) {
                    sum = sum.add(
                        this.get(i, k).multiply(matrix.get(k, j))
                    )
                }

                out.set(i, j, sum)
            }
        }

        return out
    }
}


const A = new Matrix(3, 5, [
    3, 4, 5, 6, 7,
    10, 11, 12, 13, 14,
    1, 2, 3, 4, 5
])
const B = new Matrix(5, 3, [
    1, 1, 1,
    2, 2, 2,
    3, 3, 3,
    4, 4, 4,
    5, 6, 7
])

// console.log(A.toString('wa'))
// console.log(B.toString('wa'))
console.log(A.multiply(B).toString());
