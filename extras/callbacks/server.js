function getUser(callback) {
  setTimeout(() => {
    return callback(null, {
      id: 1,
      name: 'Aladdin',
      birthDate: new Date()
    })
  }, 1000)
}

function getPhone(idUser, callback) {
  setTimeout(() => {
    return callback(null, {
      phone: '1199002',
      ddd: 11
    })
  }, 2000)
}

function getAddress(idUser, callback) {
  setTimeout(() => {
    return callback(null, {
      street: 'dos bobos',
      number: 0
    })
  }, 2000)
}

function resolveUser(error, user) {
  console.log('USER', user)
}

getUser(function resolveUser(error, user) {
  if (error) {
    console.error('ERROR USER', error)
    return
  }

  getPhone(user?.id, function resolvePhone(error1, phone) {
    if (error1) {
      console.error('ERROR phone', error1)
      return
    }

    getAddress(user.id, function resolveAddress(error2, address) {
      if (error2) {
        console.error('ERROR address', error2)
        return
      }

      console.log(`
          Nome: ${user.name},
          Endereço: ${address.street},${address.number}
          Telefone: (${phone.ddd})${phone.phone}
        `)
    })
  })
})

// getPhone(user?.id)