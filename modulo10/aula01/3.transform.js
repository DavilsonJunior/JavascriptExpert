// transform é Nosso processamento
import { Readable, Writable, Transform } from 'stream'
import { createWriteStream } from 'fs'

// Fonte de dados
const readable = Readable({
  read() {
    // 100.000
    for (let index = 0; index < 1e6; index++) {
      const person = { id: Date.now() + index, name: `Davilson-${index}` }
      const data = JSON.stringify(person)
      this.push(data)
    }

    // Informa que os dados acabaram
    this.push(null)
  }
})

// Processamento dos dados
const mapFields = Transform({
  transform(chunk, encoding, cb) {
    const data = JSON.parse(chunk)
    const result = `${data.id}, ${data.name.toUpperCase()}\n`
    cb(null, result)
  }
})

const mapHeaders = Transform({
  transform(chunk, encoding, cb) {
   this.counter = this.counter ?? 0
   if (this.counter) {
    return cb(null, chunk)
   }

   this.counter +=1;
   cb(null, "id,name\n".concat(chunk))
  }
})

// Saida dos dados
// const writable = Writable({
//   write(chunk, encoding, cb) {
//     console.log('msg', chunk.toString())

//     cb()
//   }
// })

const pipeline = readable
  // writable é sempre a Saida -> imprimir, salvar, ignorar
  // .pipe(process.stdout)
  .pipe(mapFields)
  .pipe(mapHeaders)
  // .pipe(writable)
  // .pipe(process.stdout)
  .pipe(createWriteStream('my.csv'))

  pipeline.on('end', () => console.log('end'))


