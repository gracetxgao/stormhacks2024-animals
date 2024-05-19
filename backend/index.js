const express = require('express')
const path = require('path')
const fs = require('fs')
const cors = require('cors')

const app = express()

app.use(cors())

app.get('*', (req, res) => {
    res.status(404).send("error")
})

app.get('/getAnimalsBasic', (req, res) => {
    fs.readFile('assets/animalsBasic.json', 'utf8', (err, data) => {
        if (err) {
            res.status(404).send('animalsBasic.json file not found')
        }
    
        const parsed = JSON.parse(data)

        return res.status(200).send(parsed)
    })
    return res.status(400).send('error')
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

// For non get reqs
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.post('/login', (req, res) => {
    const name = req.body

    fs.readFile('assets/users.json', 'utf8', (err, data) => {
        if (err) {
            res.status(404).send('users.json file not found')
        }
    
        const parsed = JSON.parse(data)

        // console.log(parsed)
        for (let i = 0; i < parsed.length; i++) {
            if (name === parsed[i]) {
                return res.status(200).send('login successful')
            }
        }
        return res.status(401).send('no user exists with that name')
    })
})

app.listen(5000, () => {
    console.log('Server started on http://localhost:5000')
})