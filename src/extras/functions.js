import { Scalar } from './value.js'

/**
 * Calculates the factorial of n.
 * @param {number} n The number to factorial-ize
 * @returns {number} The factorial of n
 */
export function factorial(n) {
    // TODO Convert to bigints?
    if (200 < n) return Infinity
    if (n < 0)   return -1
    if (n === 0) return 1
    if (n === 1) return 1
    return n * factorial(n - 1)
}

/**
 * Approximates e^x
 * @param {number|Scalar} x The argument
 * @returns {Scalar} The result of raising e to the power of x
 */
export function exp(x) {
    if (!(x instanceof Scalar)) {
        return new Scalar(Math.exp(x))
    }

    if (!x.hasComplexPart) {
        return exp(x.real)
    }

    // (e^a * cos(b)) + (e^a * sin(b)) i
    const eA = exp(x.real).real
    const real = eA * Math.cos(x.complex)
    const complex = eA * Math.sin(x.complex)

    return new Scalar(real, complex)
}

/**
 * Takes the power of a number
 * @param {number|Scalar} base
 * @param {number|Scalar} exponent
 * @returns {Scalar}
 */
export function pow(base, exponent) {
    if (exponent instanceof Scalar) {
        if (exponent.hasComplexPart) {
            throw Error("Not implemented, use exp() instead")
        } else {
            return pow(base, exponent.real)
        }
    } 

    if (!(base instanceof Scalar)) {
        return new Scalar(Math.pow(base, exponent))
    }

    // (a + bi)^N = (r^N * cos(N\theta)) + (sin(N\theta))i
    // where n's the exponent
    // where r's the magnitude of the complex number
    // where \theta's the angle w/ respect to the x-axis
    const mag = Math.sqrt(base.real ** 2 + base.complex ** 2)
    const theta = Math.atan(base.complex / base.real)
    const real = Math.pow(base.real, exponent) * Math.cos(mag * theta)
    const complex = Math.sin(mag * theta)

    return new Scalar(real, complex)
}
