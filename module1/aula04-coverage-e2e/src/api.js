const http = require('http')
const { once } = require('events')

const DEFAULT_USER = {
  username: 'DavilsonJunior',
  password: '123'
}

const routes = {
  '/contact:get': (request, response) => {
    response.write('contact us page')
    return response.end()
  },
  // curl -i -X POST --data '{"username":"DavilsonJunior","password":"123"}' http://localhost:3000/contact
  '/login:post': async (request, response) => { // Request retorna um async generator
   const user = JSON.parse(await once(request, "data"))

   const toLower = (text) => text.toLowerCase()
   
   if (
    toLower(user.username) !== toLower(DEFAULT_USER.username) ||
    user.password !== DEFAULT_USER.password
   ) {
    response.writeHead(401)
    response.end("Log in failed!")
    return
   }

    return response.end('Log in succeeded!')
  },
  default(request, response) {
    response.writeHead(404)
    return response.end('not found!')
  }
}

const handler = function (request, response) {
  const { url, method } = request
  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`

  const chosen = routes[routeKey] || routes.default
  return chosen(request, response)
}

const app = http.createServer(handler)
.listen(3000, () => console.log('app running at 3000'))

module.exports = app
