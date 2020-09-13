const { loginRequired } = require('../authentication/authControllers');
const { createUser, findAuthor } = require('./userControllers');

const router = require('express').Router({mergeParams: true});

router.route("/")
.post(createUser)

router.route("/getAuthor")
.get(loginRequired, findAuthor)






module.exports = router