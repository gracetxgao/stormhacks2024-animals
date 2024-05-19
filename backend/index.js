const express = require('express')
const path = require('path')
const fs = require('fs')
const cors = require('cors')

const app = express()

app.use(cors())

app.get('*', (req, res) => {
    res.status(404).send("error")
})

// For non get reqs
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.post('/test', (req, res) => {
    res.status(200).send("Test")
})

app.listen(5000, () => {
    console.log('Server started on http://localhost:5000')
})