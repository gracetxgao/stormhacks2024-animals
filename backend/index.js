const express = require('express')
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const multer = require('multer');

const app = express()

app.use(cors())

app.get('/getAnimalsBasic', (req, res) => {
    // console.log('here')
    fs.readFile(path.resolve(__dirname, 'assets/animalsBasic.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send('animalsBasic.json file not found')
        }
        // console.log(data)
        return res.status(200).send(data)
    })
})

app.get('/getThumbnail', (req, res) => {
    const fileName = req.body
    return fs.sendFile(`assets/thumbnails/${fileName}`)
})

app.get('/getAnimalsAdvanced', (req, res) => {
    const index = req.body

    fs.readFile('assets/animalsAdvanced.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send('animalsAdvanced.json file not found')
        }

        const parsed = JSON.parse(data)

        if (undefined == parsed) {
            return res.status(404).send('no file contents in animalsAdvanced.json!')
        }

        if (parsed[index] == undefined) {
            return res.status(404).send('animal not found!')
        }

        return res.status(200).send(parsed)
    })
})

app.get('*', (req, res) => {
    res.status(404).send("error")
})

// For non get commands
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.post('/login', (req, res) => {
    const name = req.body.name
    console.log(name)
    fs.readFile('assets/users.json', 'utf8', (err, data) => {
        if (err) {
            res.status(404).send('users.json file not found')
        }
    
        const { users } = JSON.parse(data)

        console.log(users)
        for (let i = 0; i < users.length; i++) {
            console.log(i)
            if (name === users[i].name) {
                return res.status(200).send('login successful')
            }
        }
        return res.status(401).send('no user exists with that name')
    })
})

app.post('/addAnimal', async (req, res) => {
    const {name, location, type, description, donationGoal, thumbNail} = req.body
    // console.log(name, location, type, description)
    let animalsBasicSuccess = false
    let animalsAdvancedSuccess = false

    fs.readFile('assets/animalsBasic.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send('animalsBasic.json file not found')
        }
    
        const parsed = JSON.parse(data)

        parsed.animals.push({name, location, type, description, thumbNail})
        // console.log(parsed)
        const toAdd = parsed
        // console.log(toAdd)
        // console.log(JSON.stringify(toAdd))
        // fs.writeFile('assets/animalsBasic.json', JSON.stringify(toAdd), () => {})
    })
    fs.readFile('assets/animalsAdvanced.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send('animalsAdvanced.json file not found')
        }
    
        const parsed = JSON.parse(data)

        parsed.animals.push({name, location, type, description, donationGoal, thumbNail})
        // console.log(parsed)
        const toAdd = parsed
        // console.log(toAdd)
        // console.log(JSON.stringify(toAdd))
        // fs.writeFile('assets/animalsAdvanced.json', JSON.stringify(toAdd), () => {})
    })
    return res.status(200).send('adding animal information successful')
})

// Set up multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, 'assets/thumbnails');
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
  
const upload = multer({ storage });

app.post('/uploadThumbnail', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    res.status(200).json({ message: 'File uploaded successfully', fileName: req.file.originalname });
});

app.listen(5000, () => {
    console.log('Server started on http://localhost:5000')
})