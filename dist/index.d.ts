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
    /**
     * @type {Object<string, Lambda.ExpressionOperator>}
     */
    operators: {
        [x: string]: any;
    };
    /**
     * Defines an operator onto this scope
     * @param {LambdaOperatorDescriptor} op An object describing the operator
     */
    defineOperator(op: LambdaOperatorDescriptor): ExpressionOperator;
    /**
     * Creates a manipulatable expression
     */
    createExpression(): Expression;
    /**
     * @param {string} name The name of the operator
     * @returns {ExpressionOperator?} The operator or null if not found
     */
    getOperator(name: string): ExpressionOperator | null;
}
/**
 * Describes an expression within a scope
 */
export class Expression {
    /**
     * @param {Scope} scope The scope to inherit operators from
     */
    constructor(scope: Scope);
    scope: Scope;
    /**
     * The tokens that make up this expression, read from left to right.
     * @type {ExpressionToken[]}
     */
    tokens: ExpressionToken[];
    /**
     * The tokens that make up this expression, but in postfix.
     * @type {ExpressionToken[]}
     */
    postfix: ExpressionToken[];
    /**
     * Writes tokens to the end of the expression
     * @param {...ExpressionToken} tokens The tokens to write
     */
    write(...tokens: ExpressionToken[]): void;
    /**
     * Converts the infix expression to postfix
     */
    shuntingYard(): void;
    /**
     * Evaluates this expression given that all of the operators contain a `perform` function.
     * @returns {ExpressionValue}
     */
    evaluate(): ExpressionValue;
    toString(): string;
}
export class ExpressionToken {
    /**
     * @param {*} value A representation of this token
     */
    constructor(value: any);
    value: any;
    toString(): any;
}
export class ExpressionValue extends ExpressionToken {
    /**
     * @param {*} value The value of this token
     */
    constructor(value: any);
}
export class ExpressionGrouper extends ExpressionToken {
    /**
     * @param {"("|")"|"["|"]"|"{"|"}"} value The grouper
     */
    constructor(value: "(" | ")" | "[" | "]" | "{" | "}");
    /** @type {'L'|'R'} */
    associativity: 'L' | 'R';
}
export class ExpressionOperator extends ExpressionToken {
    /**
     * @param {LambdaOperatorDescriptor} op An object describing the operator
     */
    constructor(op: LambdaOperatorDescriptor);
    name: string;
    symbol: string;
    associativity: "L" | "R";
    precedence: number;
    perform: LambdaPerform;
    /** @type {LambdaStringify} */
    _stringify: LambdaStringify;
    stringify(...args: any[]): string;
}
/**
 * Converts part of an expression to a string
 */
export type LambdaStringify = (left: string, right?: string) => string;
/**
 * Evaluates a part of an expression
 */
export type LambdaPerform = (left: any, right?: any) => any;
export type LambdaOperatorDescriptor = {
    /**
     * The name of this operator
     */
    name: string;
    /**
     * The symbol for this operator
     */
    symbol: string;
    /**
     * The precedence of this operator. Higher values mean higher precedence.
     */
    precedence: number;
    /**
     * The associativity of this operator. Defaults to 'L' for left-associative
     */
    associativity?: 'L' | 'R';
    stringify: LambdaStringify;
    perform?: LambdaPerform;
};
