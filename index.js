const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello Worldddd')
})

app.get('/oi', function (req, res) {
    res.send('Ola mundo')
  })
  // Lista de Personagens
  const lista = ['Rick Sanches','Morty Smith', 'Summer Smith']
  
  //Read all -> [Get]/item
  app.get('/item', function(req, res){
    res.send(lista)
  })

  // Read by id -> [GET] /item/:id
  app.get('/item/:id', function(req,res){
    // acesso o ID no parametro de rota
    const id = req.params.id
    // acesso item na lista baseado no id recebido
    const item = lista[id]
    // envio o item obtido com resposta HTTP
    res.send(item)
  })

  app.use(express.json())

  //Creat -> [POST]/item
  app.post('/item', function(req, res){
    // extraimos o corpo da requisicao
    const body = req.body
    // pegamos o nome (string) que foi enviado dentro do corpo
    const item =body.nome
    // colocamos o nome dentro da lista de itens
    lista.push(item)
    //Enviamos uma resposta com sucesso
    res.send('item adicionado com sucesso!')
  })

app.listen(3000)