'use strict'

const { watch, promises: { readFile } } = require('fs')

class File {
  watch(event, filename) {
    console.log('this', this)
    console.log('arguments', Array.prototype.slice.call(arguments))
    this.showContent(filename)
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString())
  }
}

const file = new File()
// dessa forma, ele ignora o 'this' da classe File
// herda o this do watch
// watch(__filename, file.watch)

// alternativa para não herdar o this da função
// mas fica feio
// watch(__filename, (event, filename) => file.watch(event, filename))

// podemos deixar  explicito qual é o contexto que a função deve seguir
// watch(__filename, file.watch.bind(file)) // usamos o bind quando queremos deletar uma função la dentro

// a diferença entre um e outro, é que um você passa os argumentos como array e o outro uma lista de argumentos
file.watch.call({ showContent: () => console.log('call: hey sinon!') }, null, __filename)
file.watch.apply({ showContent: () => console.log('call: hey sinon!') }, [null, __filename])