const User = require("./userModels");

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const dupUser = await User.findOne({ username });
    const dupEmail = await User.findOne({ email });
    if (dupEmail && dupUser) {
      throw new Error("This username and email has already been registered");
    }
    if (dupUser) {
      throw new Error("This username has already been registered");
    }
    if (dupEmail) {
      throw new Error("This email has already been registered");
    }
    const user = new User({
      username,
      email,
      password,
    });

    await user.save();
    const token = await user.generateToken();
    res.status(200).json({ status: "OK", data: { user, token } });
  } catch (err) {
    res.status(400).json({ status: "FAILED", error: err.message });
  }
};

exports.findAuthor = async (req, res) => {
  const { author } = req.body;
  try {
    const user = await User.findById(author);
    res.status(200).json({ status: "OK", user, id: author });
  } catch (err) {
    res.status(400).json({ status: "NOT OK", error: err.message });
  }
};
