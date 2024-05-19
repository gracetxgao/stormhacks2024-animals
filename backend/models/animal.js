const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.VITE_MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  type: {
    type: String,
  },
  description: {
    type: String,
  },
  goal: {
    type: Number,
  },
  uri: {
    type: String,
  },
})

animalSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Animal', animalSchema)