//lib
const express = require('express')
const path = require('path')
const cors = require('cors')
require('dotenv').config

const router = require('./routes/index.js')
const crawl = require('./libs/crawl/crawl.js')

//app set up
const app = express()
app.use(cors())
router(app)

app.listen(process.env.POST || 3000, (err) => {
    if (err) throw err
    crawl()
    console.log('listening on post', process.env.POST || 3000)
})
