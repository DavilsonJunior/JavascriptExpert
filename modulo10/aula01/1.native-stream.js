// ls | grep package | xargs cat | jp .name

// Readable stream - Fonte de dados - Ler de algum lugar
// writable stream - Saida dos dados - Salvar em outro lugar

// process.stdin.pipe(process.stdout)
// .on('data', msg => console.log('data', msg.toString()))
// .on('error', msg => console.log('error', msg.toString()))
// .on('end', msg => console.log('end'))
// .on('close', msg => console.log('close'))

// terminal 1
// node -e "require('net').createServer(socket => socket.pipe(process.stdout)).listen(1338)"

// terminal 2
// node -e "process.stdin.pipe(require('net').connect(1338))"


// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

// import { readFileSync } from 'fs'
// import http from 'http'

// http.createServer((req, res) => {
//   const file = readFileSync('big.file').toString()
//   res.write(file)
//   res.end()
// }).listen(3000, () => console.log('running at 3000'))


import { createReadStream } from 'fs'
import http from 'http'

http.createServer((req, res) => {
 createReadStream('big.file')
  .pipe(res)
}).listen(3000, () => console.log('running at 3000'))

// curl localhost:3000 -o output.txt 

// 23:00