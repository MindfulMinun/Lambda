import { Matrix } from "../extras/matrix.js"

// Matrix multiplication
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

console.log(`${A.rows}x${A.columns} times ${B.rows}x${B.columns} matrix:`)
console.log(A.multiply(B).toString())
