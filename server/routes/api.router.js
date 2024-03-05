const express = require('express')
const apiController = require('../controller/api.controller')

const router = express.Router()

router.get('/comic/:id', apiController.getComicDetail)
router.get('/comicList', apiController.getComics)
router.get('/chapter/:comicId', apiController.getChapter)

module.exports = router
