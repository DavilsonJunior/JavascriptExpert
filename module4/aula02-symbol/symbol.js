const assert = require('assert')

// -- keys
const uniqueKey = Symbol('userName')
const user = {}

user["userName"] = 'value for normal Objects'
user[uniqueKey] = 'value for symbol'

// console.log('getting normal Objects', user.userName)
// // sempre unico em nivel de endereço de memoria
// console.log('getting normal Objects', user[Symbol('userName')])
// console.log('getting normal Objects', user[uniqueKey])

assert.deepStrictEqual(user.userName, 'value for normal Objects')

// sempre unico em nivel de endereço de memoria
assert.deepStrictEqual(user[Symbol("userName")], undefined)
assert.deepStrictEqual(user[uniqueKey], 'value for symbol')

// é dificil de pegar, mas não é secreto
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)
user[Symbol.for('password')] = 123
assert.deepStrictEqual(user[Symbol.for('password')], 123)
  // --- keys

// Well Known Symbols
const obj = {
  // iterators
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        //remove o ultimo e retorna
        value: this.items.pop()
      }
    }
  })
}

// for (const item of obj) {
//   console.log('item', item)
// }

assert.deepStrictEqual([...obj], ['a', 'b', 'c'])

const kItems = Symbol('kItems')
class MyDate {
  constructor(...args) {
    this[kItems] = args.map(arg => new Date(arg))
  }
}

const myDate = new MyDate(
  [2020, 3, 1]
  [2018, 2, 2]
)

const expectedDates = new MyDate(
  new Date(2020, 3, 1),
  new Date(2018, 2, 2)
)

console.log('myDate', myDate)

//14:00