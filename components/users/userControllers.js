const User = require("./userModels");

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({
        username,
        email,
        password
    })
    
    await user.save()
    const token = await user.generateToken();
    res.status(200).json({status: "OK", data: {user, token}})
  } catch (err) {
      res.status(400).json({status: "FAILED", error: err.message})
  }
};
