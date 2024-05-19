const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://gracetxgao:${password}@cluster0.vac42de.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
    location: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    goal: {
        type: Number,
        required: true
    },
    uri: {
        type: String,
        required: true
    },
});

const Animal = mongoose.model('Animal', animalSchema)

if (process.argv.length === 3) { // node mongo.js password
  console.log('animals:');
  Animal
    .find({})
    .then(result => {
      result.forEach(animal => {
        const name = animal.name
        const uri = animal.uri
        console.log(name, uri);
      })
      mongoose.connection.close()
    })
} else if (process.argv.length === 9) { // node mongo.js password name location type description goal uri
    const name = process.argv[3]
    const location = process.argv[4]
    const type = process.argv[5]
    const description = process.argv[6]
    const goal = process.argv[7]
    const uri = process.argv[8]
    const animal = new Animal({
        name: name,
        location: location,
        type: type,
        description: description,
        goal: goal,
        uri: uri,
    })
    animal.save().then(result => {
      console.log(`added ${name} to animals`);
      mongoose.connection.close()
    })
} else {
  console.log('unknown input');
  process.exit(1)
}