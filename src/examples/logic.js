// Predicate logic
import Lambda from '../index.js'
const logic = new Lambda.Scope()

logic.defineOperator({
    name: 'Negation',
    symbol: '!',
    stringify: operator => `\\lnot ${operator}`,
    perform: op => !op.value,
    precedence: 5
})
logic.defineOperator({
    name: 'Conjunction',
    symbol: '^',
    stringify: (left, right) => `${left} \\land ${right}`,
    perform: (left, right) => left.value && right.value,
    precedence: 4
})
logic.defineOperator({
    name: 'Disjunction',
    symbol: '+',
    stringify: (left, right) => `${left} \\lor ${right}`,
    perform: (left, right) => left.value || right.value,
    precedence: 3
})
logic.defineOperator({
    name: 'Conditional',
    symbol: '->',
    stringify: (left, right) => `${left} \\rarr ${right}`,
    perform: (left, right) => !left.value || right.value,
    precedence: 2
})
logic.defineOperator({
    name: 'Biconditional',
    symbol: '<->',
    stringify: (left, right) => `${left} \\iff ${right}`,
    perform: (left, right) => left.value === right.value,
    precedence: 1
})

const expr = logic.createExpression()

expr.write(
    new Lambda.ExpressionValue(true),
    logic.getOperator('Conjunction'),
    logic.getOperator('Negation'),
    new Lambda.ExpressionValue(false)
)
expr.shuntingYard()

console.log(expr.toString()) // T ^ !F
console.log(expr.evaluate())
