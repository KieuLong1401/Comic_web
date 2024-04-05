const express = require('express')
const comicController = require('../controller/comics.controller')
const chapterController = require('../controller/chapter.controller')
const commentController = require('../controller/comments.controller')
const userController = require('../controller/user.controller')

const router = express.Router()



router.get('/comic/:id', comicController.getDetail)
router.get('/comicList', comicController.getList)

router.get('/chapter/:comicId', chapterController.getList)

router.post('/addComment', commentController.post)

router.post('/signup', userController.signup)
router.post('/login', userController.login)

module.exports = router
