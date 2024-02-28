require('dotenv').config()
const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')

const dbUrl = process.env.DATABASE_URL
const dbName = 'Ocean-Jornada-Backend-Fev2024'

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

    // Realizamos a operacao de find na colection do mongdb
    const items = await collection.find().toArray()

    // Envio todos os documentos como resposta HTTP
    res.send(items)
  })

  // Read by id -> [GET] /item/:id
  app.get('/item/:id', async function (req, res) {
    // acesso o ID no parametro de rota
    const id = req.params.id

    // acesso item na collection baseado no id recebido
    const item = await collection.findOne({
      _id: new ObjectId(id)
    })

    // envio o item obtido com resposta HTTP
    res.send(item)
  })

  app.use(express.json())

  //Creat -> [POST]/item
  app.post('/item', async function (req, res) {
    // extraimos o corpo da requisicao
    const item = req.body


    // colocamos o item dentro da collection de itens
    await collection.insertOne(item)

    //Enviamos uma resposta com sucesso
    res.send(item)
  })
  //UPDATE -> [PUT] /item/:id
  app.put('/item/:id', async function(req,res){
    // pegamos o ID recebido pela rota
    const id = req.params.id

    //pegamos o novo item do corpo da requisicao
    const novoItem = req.body

    //atualizamos o documento da collection
    await collection.updateOne(
      {_id: new ObjectId(id)},
      {$set : novoItem}

      )

    res.send('Item atualizado com sucesso')
  })

  //Delete -> [DELETE] /item /:id
  app.delete('/item/:id', async function (req,res){
    // pegamos o ID da rota
    const id = req.params.id

    //realizamos a operacao de deleteone
    await collection.deleteOne({ _id: new ObjectId(id) })

//Enviamos uma mensagem de sucesso
    res.send('ITEM removido com sucesso!')
  })

  app.listen(3000)
}

main()