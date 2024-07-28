const assert = require('assert')

const myMap = new Map()

// podem ter qualquer coisa como chave
myMap
.set(1, 'one')
.set('Erick', { text: 'two' })
.set(true, () => 'hello')

// usando um construtor
const myMapCOnstructor = new Map(
 [
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1']
 ]
)

// console.log('myMap', myMap)
// console.log('myMap.get(1)', myMap.get(1))

assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Erick'), { text: 'two' })
assert.deepStrictEqual(myMap.get(true)(), 'hello')

// Em objects a chave so pode ser string ou symbol (number é coergido a string)
const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: 'ErickWendel' })

// utilitarios
// No object seria Object.keys({ a: 1 }).length
assert.deepStrictEqual(myMap.size, 4)

// Para verificar se um item existe no objeto
// item.key = se não existe = undefined
// if () = coercao implicita para boolean e retorna false
// o jeito certo em Object é ({ name: 'Davilson' }).hasOwnProperty('name)
assert.ok(myMap.has(onlyReferenceWorks))

// para remover um item do objeto
// delete item.id
// imperformatico para o javascript
assert.ok(myMap.delete(onlyReferenceWorks))

// Não da para iterar em objects diretamente
// tem que transform,ar com Object.entries(item)
assert.deepStrictEqual(JSON.stringify([...myMap]), '[[1,"one"],["Erick",{"text":"two"}],[true,null]]')

// for (const [key, value] of myMap) {
//   console.log(key, value)
// }

// Object é inseguro, pois dependendo do nome da chave, pode substituir algum comportamento padrão
// ({ }).toString() === '[object Object]'
// ({ toString: () =: 'hey }).toString() === 'Hey

// Qualquer chave pode colidir, com as propriedades herdadas do object, como
// constructor, toString, valueOf e etc

const actor = {
  name: 'Xuxa da Silva',
  toString: 'Queen: Xuxa da Silva'
}

// não tem restrição de nome de chave
myMap.set(actor)

assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString(), TypeError)

// Não da para limpar um object sem reassina-lo
myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])

// ---WeakMap

// Pode ser coletado após perder as  referencias
// usadi em casos beem especificos

// tem a maioria dos beneficos do map
// Mas: não é iteravel
// so chaves de referencias e que vocẽ ja conheça
// mais leve e preve leak de memoria, pq depois que as instancias saem da memoria, tudo é limpo

const weakMap = new WeakMap()
const hero = { name: 'Flash' }

// weakMap.set(hero)
// weakMap.get(hero)
// weakMap.delete(hero)
// weakMap.has(hero)
