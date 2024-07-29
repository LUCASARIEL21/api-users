const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const express = require('express')
const app = express()
const port = 3000;
app.use(express.json())

const users = []

app.get('/usuarios', async (req, res) => {
  let users = []

  if(req.query){
    users = await prisma.user.findMany({
      where:{
        name: req.query.name
      }
    })
  }else{
    users = await prisma.user.findMany()
  }

  res.status(200).json(users)
})

app.post('/usuarios', async (req, res) => {
  await prisma.user.create({
    data:{
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    }
  })
  res.status(201)
})

app.put('/usuarios/:id', async (req, res) => {
  await prisma.user.update({
    where:{
      id: req.params.id
    },
    data:{
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    }
  })
})

app.delete('/usuarios/:id', async (req, res) => {
  await prisma.user.delete({
    where:{
      id: req.params.id
    }
  })
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})