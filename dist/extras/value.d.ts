/**
 * Represents a mathematical quantity. Could be a boolean, a scalar, a matrix, or whatever you want it to be.
 * @author MindfulMinun
 * @since 2020-05-12
 * @version 1.0.0
 */
export class Value {
    value: any;
    error: any;
    hasError(): boolean;
}
/**
 * Represents a number, could have a complex part.
 * @author MindfulMinun
 * @since 2020-05-12
 * @version 1.0.0
 */
export class Scalar extends Value {
    /**
     * @param {number} real The real part
     * @param {number} [complex] The complex part
     */
    constructor(real: number, complex?: number);
    /** Represents the real part of the number */
    real: number;
    /** Represents the complex part of the number */
    complex: number;
    /**
     * Adds two scalars
     * @param {Scalar} addend The scalar to add
     * @returns {Scalar} The sum of these two scalars
     */
    add(addend: Scalar): Scalar;
    /**
     * Multiplies two scalars
     * @param {Scalar} factor The scalar to multiply by
     * @returns {Scalar} The product of these two scalars
     */
    multiply(factor: Scalar): Scalar;
    /**
     * Divides this scalar by another
     * @param {Scalar} divisor The scalar to divide by
     * @returns {Scalar} The quotient of these two scalars
     */
    division(divisor: Scalar): Scalar;
    get hasComplexPart(): boolean;
    /**
     * Converts this complex number to a string
     * @param {number} [radix]
     * @returns {string} The
     */
    toString(radix?: number): string;
    /**
     * Scalar to fixed-point
     * @param {number} digits The number of digits to show
     * @returns {string} The scalar in fixed point
     */
    toFixed(digits?: number): string;
    /**
     * Scalar to scientific notation
     * @param {number} digits The number of digits to show
     * @returns {string} The scalar in scientific notation
     */
    toExponential(digits: number): string;
    /**
     * Scalar to precision
     * @param {number} digits The number of digits to show
     * @returns {string} The scalar in the given precision
     */
    toPrecision(digits: number): string;
    /**
     * Converts this number to a JavaScript number by taking its magnitude.
     * @returns {number}
     */
    valueOf(): number;
}
