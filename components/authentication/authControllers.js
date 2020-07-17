const User = require("../users/userModels");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      status: "OK",
      message: "Please input both Username and password to login",
    });
  }
  const user = await User.find({username: username})
  console.log(user)
};
