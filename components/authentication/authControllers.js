const User = require("../users/userModels");
const bcrypt = require("bcrypt");
const {catchAsync} = require('../error/errorControllers')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        status: "OK",
        message: "Please input both Username and password to login",
      });
    }
    const user = await User.find({ username: username });

    let match = await bcrypt.compare(password, user[0].password);

    if (match) {
      const token = await user[0].generateToken();
      res.status(200).json({ status: "OK", user, token });
    } else throw new Error("Wrong password/ email");
  } catch (error) {
    res.status(400).json({ status: "NOT OK", error: error.message });
  }
};

exports.loginRequired = catchAsync(async (request, response, next) => {
  const authorization = request.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }
  const token = authorization.replace("Bearer ", "");
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ _id: decode._id, tokens: token });
  if (!user) throw new Error("Invalid user");
  request.user = user;
  request.token = token;
  next();
});
