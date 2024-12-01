import express from 'express'
import mongoose from 'mongoose'

import User from './models/User.js'

const app = express()

app.use(express.json())

const users = []

app.get("/users", async (request, response) => {
    const users = await User.find()

    return response.status(200).json(users)
})

app.post("/users", async (request, response) => {
    const user = request.body
    
    const newUser = await User.create(user)

    return response.status(201).json(newUser)
})

mongoose.connect("mongodb+srv://mongo:mongoso@cluster0.pjqam.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('Banco Conectado!'))
    .catch(() => console.log('Algo deu errado :( '))
    
app.listen(3000)
