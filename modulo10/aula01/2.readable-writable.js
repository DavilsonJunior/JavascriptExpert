import { Readable, Writable } from 'stream'

// Fonte de dados
const readable = Readable({
  read() {
    this.push('Hello World 1')
    this.push('Hello World 2')
    this.push('Hello World 3')

    // Informa que os dados acabaram
    this.push(null)
  }
})

// Saida dos dados
const writable = Writable({
  write(chunk, encoding, cb) {
    console.log('msg', chunk.toString())

    cb()
  }
})

readable
// writable é sempre a Saida -> imprimir, salvar, ignorar
  // .pipe(process.stdout)
  .pipe(writable)