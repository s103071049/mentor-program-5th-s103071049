// eslint-disable-next-line
const request = require('request')

const process = require('process')

const paraOne = process.argv[2] // list, read, delete, create, update
const paraTwo = process.argv[3] // id, bookname
const paraThree = process.argv[4] // bookname

switch (paraOne) {
  case 'list':
    list()
    break

  case 'read':
    read(paraTwo)
    break

  case 'delete':
    del(paraTwo)
    break

  case 'create':
    create(paraTwo)
    break

  case 'update':
    update(paraTwo, paraThree)
    break
}

function list() {
  request(
    'https://lidemy-book-store.herokuapp.com/books',
    (error, response, body) => {
      for (let i = 0; i < 20; i++) {
        const json = JSON.parse(body)
        console.log(`${json[i].id} ${json[i].name}`)
      }
    }
  )
}

function read(paraTwo) {
  request(
     `https://lidemy-book-store.herokuapp.com/books/${paraTwo}`,
     (error, response, body) => {
       const json = JSON.parse(body)
       console.log(json.name)
     }
  )
}

function del(paraTwo) {
  request.delete(
      `https://lidemy-book-store.herokuapp.com/books/${paraTwo}`
  )
}

function create(paraTwo) {
  request.post(
    {
      url: 'https://lidemy-book-store.herokuapp.com/books',
      form: {
        name: paraTwo
      }
    }
  )
}

function update(paraTwo, paraThree) {
  request.patch(
    {
      url: `https://lidemy-book-store.herokuapp.com/books/${paraTwo}`,
      form: {
        name: paraThree
      }
    })
}
