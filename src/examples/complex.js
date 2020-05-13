import { Scalar } from '../extras/value.js'
import { exp } from '../extras/functions.js'

const pi = new Scalar(Math.PI)
const i = new Scalar(0, 1)

const result = exp(pi.multiply(i))

console.log(`e^{pi * i} = ${result.toFixed(3)}`)
