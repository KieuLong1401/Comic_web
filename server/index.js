//lib
const express = require('express')
const path = require('path')
const cors = require('cors')
require('dotenv').config

const router = require('./routes/index.js')
const crawl = require('./libs/crawl/crawl.js')

//app set up
const app = express()
app.use(
    cors({
        origin: ['https://comic-web-seven.vercel.app'],
        methods: ['POST', 'GET'],
        credentials: true,
    })
)
router(app)

app.listen(3001, (err) => {
    if (err) throw err
    crawl()
    console.log('listening on post', 3001)
})
