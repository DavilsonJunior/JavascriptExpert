'use strict'

const { readFile } = require('fs/promises')
const { join } = require('path')
const pdf = require('pdf-parse')

;(async () => {
  const dataBuffer = await readFile(join(__dirname, './../../../docs/contract.pdf'))
  const data = await pdf(dataBuffer)
  console.log('dataBuffer', data.text)
})()

// execute no termninal npm run start:dev | tee text.txt

// 10:00