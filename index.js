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

app.listen(3000)