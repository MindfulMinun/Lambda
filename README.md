# Lambda

> Make your own calculator

```js
import Lambda from 'dist/index.js'

// Create your own world of math
const logic = new Lambda.Scope()

// Define operators that follow certain rules
logic.defineOperator({
    name: 'Conjunction',
    symbol: '^',
    stringify: (left, right) => `${left} \\land ${right}`,
    perform: (left, right) => left.value && right.value,
    precedence: 4
})
logic.defineOperator({
    name: 'Negation',
    symbol: '!',
    stringify: operator => `!${operator}`,
    perform: op => !op.value,
    precedence: 5
})

// Create expressions from those rules
const expr = logic.createExpression()

expr.write(
    new Lambda.ExpressionValue(true),
    logic.getOperator('Conjunction'),
    logic.getOperator('Negation'),
    new Lambda.ExpressionValue(false)
)

// ...and evaluate them
console.log(expr.toString()) // true ^ ! false
console.log(expr.evaluate()) // ExpressionValue { value: true }
```


See [some examples](https://github.com/MindfulMinun/Lambda/tree/master/src/examples).

## Versioning

Follow [SemVer](https://semver.org/) for versioning. See the [tags on this repo](https://github.com/MindfulMinun/Lambda/tags) for available versions.

## License

[MIT](./LICENSE)
