/**
 * Calculates the factorial of n.
 * @param {number} n The number to factorial-ize
 * @returns {number} The factorial of n
 */
export function factorial(n: number): number;
/**
 * Approximates e^x
 * @param {number|Scalar} x The argument
 * @returns {Scalar} The result of raising e to the power of x
 */
export function exp(x: number | Scalar): Scalar;
/**
 * Takes the power of a number
 * @param {number|Scalar} base
 * @param {number|Scalar} exponent
 * @returns {Scalar}
 */
export function pow(base: number | Scalar, exponent: number | Scalar): Scalar;
import { Scalar } from "./value.js";
