/**
 * Represents a mathematical quantity. Could be a boolean, a scalar, a matrix, or whatever you want it to be.
 * @author MindfulMinun
 * @since 2020-05-12
 * @version 1.0.0
 */
export class Value {
    constructor() {
        this.value = null
        this.error = null
    }
    hasError() {
        return !!this.error
    }
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
    constructor(real, complex) {
        super()
        /** Represents the real part of the number */
        this.real = real
        /** Represents the complex part of the number */
        this.complex = 0
        /** Whether this scalar has a complex part or not */
        // this.hasComplexPart = false

        if (complex != null) {
            this.complex = complex
            // this.hasComplexPart = true
        }
    }

    /**
     * Adds two scalars
     * @param {Scalar} addend The scalar to add
     * @returns {Scalar} The sum of these two scalars
     */
    add(addend) {
        const real = this.real + addend.real
        if (this.hasComplexPart || addend.hasComplexPart) {
            return new Scalar(real, this.complex + addend.complex)
        }
        return new Scalar(real)
    }

    /**
     * Multiplies two scalars
     * @param {Scalar} factor The scalar to multiply by
     * @returns {Scalar} The product of these two scalars
     */
    multiply(factor) {
        // Multiplication of complex numbers
        // (a + bi) * (c + di) = (ac - bd) + (ad + bc)i
        const real = this.real * factor.real - this.complex * factor.complex
        if (this.hasComplexPart || factor.hasComplexPart) {
            const complex = this.real * factor.complex + this.complex * factor.real
            return new Scalar(real, complex)
        }

        return new Scalar(real)
    }

    /**
     * Divides this scalar by another
     * @param {Scalar} divisor The scalar to divide by
     * @returns {Scalar} The quotient of these two scalars
     */
    division(divisor) {
        // If neither component has a complex part, just do regular division
        if (!this.hasComplexPart && !divisor.hasComplexPart) {
            return new Scalar(this.real / divisor.real)
        }

        // https://mathworld.wolfram.com/ComplexDivision.html
        // Real: ((ac + bd) / (c^2 + d^2))
        // Complex: ((bc - ad) / (c ^ 2 + d ^ 2) i)
        const real = (this.real * divisor.real + this.complex * divisor.complex) / (divisor.real ** 2 + divisor.complex ** 2)
        const complex = (this.complex * divisor.real - this.real * divisor.complex) / (divisor.real ** 2 + divisor.complex ** 2)

        return new Scalar(real, complex)
    }

    // conjugate()

    get hasComplexPart() {
        return this.complex !== 0
    }

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
    toString(radix = 10) {
        if (this.hasComplexPart) {
            return `${this.real.toString(radix)} ${this.complex === Math.abs(this.complex) ? '+' : '-'} ${Math.abs(this.complex).toString(radix)}i`
        }
        return this.real.toString(radix)
    }

    /**
     * Scalar to fixed-point
     * @param {number} digits The number of digits to show
     * @returns {string} The scalar in fixed point
     */
    toFixed(digits = 3) {
        if (this.hasComplexPart) {
            return `${this.real.toFixed(digits)} ${this.complex === Math.abs(this.complex) ? '+' : '-'} ${Math.abs(this.complex).toFixed(digits)}i`
        }
        return this.real.toFixed(digits)
    }

    /**
     * Scalar to scientific notation
     * @param {number} digits The number of digits to show
     * @returns {string} The scalar in scientific notation
     */
    toExponential(digits) {
        if (this.hasComplexPart) {
            return `${this.real.toExponential(digits)} ${this.complex === Math.abs(this.complex) ? '+' : '-'} ${Math.abs(this.complex).toExponential(digits)}i`
        }
        return this.real.toExponential(digits)
    }

    /**
     * Scalar to precision
     * @param {number} digits The number of digits to show
     * @returns {string} The scalar in the given precision
     */
    toPrecision(digits) {
        if (this.hasComplexPart) {
            return `${this.real.toPrecision(digits)} ${this.complex === Math.abs(this.complex) ? '+' : '-'} ${Math.abs(this.complex).toPrecision(digits)}i`
        }
        return this.real.toPrecision(digits)
    }

    /**
     * Converts this number to a JavaScript number by taking its magnitude.
     * @returns {number}
     */
    valueOf() {
        if (!this.hasComplexPart) {
            return this.real
        }

        return Math.sqrt(this.real ** 2 + this.complex ** 2)
    }
}
