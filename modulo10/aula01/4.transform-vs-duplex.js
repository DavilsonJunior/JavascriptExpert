import { Duplex, Transform } from 'stream'

// Socket é uma duplex stream
let count = 0;
const server = Duplex({
  encoding: 'utf8', 
  objectMode: true, // faz não precisar trabalhar com buffer => gasta mais memoria
  read(chunk, encoding, cb) {
    const everySecond = (intervalContext) => {
      if (count++ <=5) {
        this.push(`My name is Davilson[${count}]`)
        return
      }

      clearInterval(intervalContext)
      this.push(null)
    }
    setInterval(() => { everySecond(this) })
  },
  // é como se fosse um objeto completamente diferente
  write(chunk, encoding, cb) {
    console.log(`[writable] saving`, chunk)
    cb()
  }
})

// provar que são canais de comunicação diferentes
// write aciona o writable do Duplex
server.write('[duplex] hey this is a writable!\n')

// on data => loga o que rolou no .push do readable
// server.on('data', msg => console.log(`[readable${msg}]`))

// o push deixa você enviar mais dados
server.push(`[duplex] hey this is also a readable!\n`)

// server
//   .pipe(process.stdout)

const transformToUpperCase = Transform({
  objectMode: true,
  transform(chunk, encoding, cb) {
    cb(null, chunk.toUpperCase())
  }
})

// transform é também um duplex, mas não possuem comunicação independente

transformToUpperCase.write('[transform] hello from write')
// o push vai ignorar tudo o que você tem na função transform
transformToUpperCase.push('[transform] hello from push!\n')

server
  .pipe(transformToUpperCase)
  // redireciona todos os dados de readable para writable da duplex, deixa no mesmo canal
  .pipe(server)
