//lib
const express = require('express')
const cors = require('cors')

const router = require('./routes/index.js')
const crawl = require('./libs/crawl/crawl.js')
const authenticateToken = require('./middleware/authenticateToken.js')

//app set up
require('dotenv').config
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
    cors({
        origin: ['http://localhost:3000'],
        methods: ['POST', 'GET', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
)

app.use(authenticateToken)

router(app)

app.listen(3001, (err) => {
    if (err) console.log(err)
    crawl().catch((err) => console.log(err))
    console.log('listening on post', 3001)
})
