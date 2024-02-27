const express = require('express')
const { MongoClient } = require('mongodb')

const dbUrl = 'mongodb+srv://admin:jLN5luYeIfBnpLyd@cluster0.o3f6ekr.mongodb.net'
const dbName = 'OceanJornadaBackendFev2024'

async function main() {
  const client = new MongoClient(dbUrl)

  console.log('Conectando ao banco de dados...')
  await client.connect()
  console.log('Banco de dados conectado com sucesso!')

  const app = express()

  app.get('/', function (req, res) {
    res.send('Hello World')
  })

  app.get('/oi', function (req, res) {
    res.send('Ola mundo')
  })
  // Lista de Personagens
  const lista = ['Rick Sanches', 'Morty Smith', 'Summer Smith']

  const db = client.db(dbName)
  const collection = db.collection('items')

  //Read all -> [Get]/item
  app.get('/item', async function (req, res) {
    // Envio a lista inteira como resposta HTTP
    res.send(lista)
    // Realizamos a operacao de find na colection do mongdb
    const items = await collection.find().toArray()
    // Envio todos os documentos como resposta HTTP
    res.send(items)
  })

  // Read by id -> [GET] /item/:id
  app.get('/item/:id', function (req, res) {
    // acesso o ID no parametro de rota
    const id = req.params.id
    // acesso item na lista baseado no id recebido
    const item = lista[id]
    // envio o item obtido com resposta HTTP
    res.send(item)
  })

  app.use(express.json())

  //Creat -> [POST]/item
  app.post('/item', function (req, res) {
    // extraimos o corpo da requisicao
    const body = req.body
    // pegamos o nome (string) que foi enviado dentro do corpo
    const item = body.nome
    // colocamos o nome dentro da lista de itens
    lista.push(item)
    //Enviamos uma resposta com sucesso
    res.send('item adicionado com sucesso!')
  })

  app.listen(3000)
}

main()