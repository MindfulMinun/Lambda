/**
 * Lambda - Make your own calculator
 */
const Lambda = {}

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
export class Scope {
    constructor() {
        /**
         * @type {Object<string, Lambda.ExpressionOperator>}
         */
        this.operators = {}
    }

    /**
     * Defines an operator onto this scope
     * @param {LambdaOperatorDescriptor} op An object describing the operator
     */
    defineOperator(op) {
        const operator = new ExpressionOperator(op)
        this.operators[op.name] = operator
        return operator
    }

    /**
     * Creates a manipulatable expression
     */
    createExpression() {
        return new Expression(this)
    }

    /**
     * @param {string} name The name of the operator
     * @returns {ExpressionOperator?} The operator or null if not found
     */
    getOperator(name) {
        return this.operators[name] || null
    }
}

/**
 * Describes an expression within a scope
 */
export class Expression {
    /**
     * @param {Scope} scope The scope to inherit operators from
     */
    constructor(scope) {
        this.scope = scope
        /**
         * The tokens that make up this expression, read from left to right.
         * @type {ExpressionToken[]}
         */
        this.tokens = []
        /**
         * The tokens that make up this expression, but in postfix.
         * @type {ExpressionToken[]}
         */
        this.postfix = []
    }
    
    /**
     * Writes tokens to the end of the expression
     * @param {...ExpressionToken} tokens The tokens to write
     */
    write(...tokens) {
        this.tokens.push(...tokens)
    }

    /**
     * Converts the infix expression to postfix
     */
    shuntingYard() {
        this.postfix = []
        const tokens = [...this.tokens]
        /**
         * Retrieves the last element in an array
         * @private
         * @param {T[]} what The array to read from
         * @returns {T} The last element
         * @template T
         */
        const peek = what => what[what.length - 1]

        /** @type {ExpressionToken[]} */
        const stack = []

        // 1. While there are tokens to be read, read a token
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];

            // 1a. If the token is a number or a variable, add it to the output queue
            if (token instanceof ExpressionValue) {
                this.postfix.push(token)
                continue
            }

            // If a token is a function token...
            // If a token is a function argument separator...

            // 1b. If the token is an operator...
            if (token instanceof ExpressionOperator) {
                // 1bi. While there are operators on the stack...
                while (stack.length) {
                    if (!(peek(stack) instanceof ExpressionOperator)) {
                        break
                    }
                    
                    /** @type {ExpressionOperator} */
                    const next = peek(stack)

                    // 1bii. and if the last element is left-associative AND its precedence is less than or equal to the current token...
                    // 1biii. ...OR the last element is right-associative AND its precedence is less than the current token
                    if (
                        (token.associativity === 'L' && (token.precedence <= next.precedence)) ||
                        (token.associativity === 'R' && (token.precedence < next.precedence))
                    ) {
                        // 1biv. ...pop the last element onto the output queue
                        this.postfix.push(stack.pop())
                    } else {
                        break
                    }
                }
                // 1bv. Push the operator onto the stack
                stack.push(token)
                continue
            }

            // 1c. If the token is a left paren, push it onto the stack.
            if (token instanceof ExpressionGrouper && token.associativity === 'L') {
                stack.push(token)
                continue
            }

            // 1d. If the token is a right paren...
            if (token instanceof ExpressionGrouper && token.associativity === 'R') {
                let foundMatching = false
                while (stack.length && !foundMatching) {
                    // 1di. pop operators off the stack until a matching parens is found
                    const temp = stack.pop()
                    if (token instanceof ExpressionGrouper && token.associativity === 'L') {
                        foundMatching = true
                    } else {
                        this.postfix.push(temp)
                    }
                }

                // (If no matching parens was in the queue, there's a mismatch)
                if (!foundMatching) {
                    throw Error("Mismatched parens (missing?)")
                }

                // 1dii. Pop the left parens from the stack (but not onto the output)
                stack.pop()

                continue
            }

            throw Error(`Unknown token: ${token}`)
        }

        // 2. After there are no more tokens to be read AND there are still things in the stack...
        while (stack.length) {
            // 2a. ...pop them to the output queue
            const temp = stack.pop()

            // (If there are parens was in the queue, there's a mismatch)
            if (temp instanceof ExpressionGrouper) {
                throw Error("Mismatched parens (too many?)")
            }

            this.postfix.push(temp)
        }
    }

    /**
     * Evaluates this expression given that all of the operators contain a `perform` function.
     * @returns {ExpressionValue}
     */
    evaluate() {
        /** @type {ExpressionValue[]} */
        const stack = []

        // If !postfix.length, shuntingYard()
        this.postfix.length || this.shuntingYard()

        for (let i = 0; i < this.postfix.length; i++) {
            const token = this.postfix[i]
            if (token instanceof ExpressionValue) {
                stack.push(token)
                continue
            }
            if (token instanceof ExpressionOperator) {
                if (token._stringify.length) {
                    let l = token._stringify.length
                    /** @type {ExpressionValue[]} */
                    const operands = []
                    while (0 < l) {
                        const temp = stack.pop()
                        if (!temp) {
                            console.error(temp)
                            throw Error("That's not a number")
                        }
                        operands.push(temp)
                        l--
                    }
                    // console.log(`Performing ${token.name} onto ${operands.length}`)
                    const result = token.perform(...operands)
                    stack.push(
                        result instanceof ExpressionValue ? result
                            : new ExpressionValue(result)
                    )
                } else {
                    console.error(token)
                    throw Error("Not implemented")
                }
            }
        }

        return stack[0]
    }

    toString() {
        // if (this.postfix.length) {
        // } else {
        return this.tokens.join(' ')
        // }
    }
}

export class ExpressionToken {
    /**
     * @param {*} value A representation of this token
     */
    constructor(value) {
        this.value = value
    }
    toString() {
        return this.value
    }
}

export class ExpressionValue extends ExpressionToken {
    /**
     * @param {*} value The value of this token
     */
    constructor(value) {
        super(value)
    }
    toString() {
        return this.value
    }
}

export class ExpressionGrouper extends ExpressionToken {
    /**
     * @param {"("|")"|"["|"]"|"{"|"}"} value The grouper
     */
    constructor(value) {
        super(value)
        /** @type {'L'|'R'} */
        this.associativity = /[\(\[\{]/.test(value) ? 'L' : 'R'
    }
}

export class ExpressionOperator extends ExpressionToken {
    /**
     * @param {LambdaOperatorDescriptor} op An object describing the operator
     */
    constructor(op) {
        super(op.symbol || '.')
        this.name = op.name
        this.symbol = op.symbol || '.'
        this.associativity = op.associativity || 'L'
        this.precedence = op.precedence
        this.perform = op.perform
        /** @type {LambdaStringify} */
        this._stringify = op.stringify || function () { Array.from(arguments).join(this.symbol) }
    }
    stringify() {
        return this._stringify(...arguments)
    }
}
