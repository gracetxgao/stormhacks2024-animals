require('dotenv').config()
const express = require('express')
const app = express()

const Animal = require('./models/animal')

app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

const cors = require('cors')

app.use(cors())

app.use(express.json())

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/animals', (request, response) => {
  Animal.find({}).then(animals => {
    response.json(animals)
    console.log(`${animals}`);
  })
})

app.post('/api/animals', (request, response) => {
  const body = request.body

  if (body.uri === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const animal = new Animal({
    name: body.name,
    location: body.location,
    type: body.type,
    description: body.description,
    goal: body.goal,
    uri: body.uri
  })
  console.log(animal);

  animal.save().then(savedAnimal => {
    response.json(savedAnimal)
  })
  .catch(error => next(error))
})

app.use(unknownEndpoint)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)