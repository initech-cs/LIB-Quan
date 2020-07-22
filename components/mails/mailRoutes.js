const { createMail } = require('./mailControllers');
const { loginRequired } = require('../authentication/authControllers');

const router = require('express').Router({mergeParams: true});

router.route("/createMail")
.post(loginRequired ,createMail)





module.exports = router