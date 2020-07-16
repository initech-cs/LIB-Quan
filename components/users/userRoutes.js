const { createUser } = require('./userControllers');

const router = require('express').Router({mergeParams: true});

router.route("/")
.post(createUser)






module.exports = router