const { login } = require("./authControllers");

const router = require("express").Router({ mergeParams: true });

router.route("/").post(login);

module.exports = router;
