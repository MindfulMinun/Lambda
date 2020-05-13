// Basic Math
import * as Lambda from '../index.js'
const math = new Lambda.Scope()

math.defineOperator({
    name: 'Exponentiation',
    symbol: '^',
    associativity: 'R',
    stringify: (base, exponent) => `(${base})^(${exponent})`,
    perform: (base, exponent) => base.value ** exponent.value,
    precedence: 3
})
math.defineOperator({
    name: 'Multiplication',
    symbol: '*',
    stringify: (left, right) => `(${left}) \\times (${right})`,
    perform: (left, right) => left.value * right.value,
    precedence: 2
})
math.defineOperator({
    name: 'Division',
    symbol: '*',
    stringify: (num, denom) => `\\lfrac{${num}}{${denom}}`,
    perform: (num, denom) => num.value / denom.value,
    precedence: 2
})
math.defineOperator({
    name: 'Addition',
    symbol: '+',
    stringify: (left, right) => `(${left}) + (${right})`,
    perform: (left, right) => left.value + right.value,
    precedence: 1
})
math.defineOperator({
    name: 'Subtraction',
    symbol: '-',
    stringify: (left, right) => `(${left}) - (${right})`,
    perform: (left, right) => left.value - right.value,
    precedence: 1
})


const expr = math.createExpression()

expr.write(
    // new Lambda.ExpressionGrouper('('),
    new Lambda.ExpressionValue(4),
    math.getOperator('Addition'),
    new Lambda.ExpressionValue(3),
    math.getOperator('Multiplication'),
    new Lambda.ExpressionValue(4),
)
expr.shuntingYard()
    
console.log(expr.toString())
console.log(expr.evaluate())
