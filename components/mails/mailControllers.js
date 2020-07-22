const Mail = require("./mailModels");
const User = require("../users/userModels");

exports.createMail = async (req, res) => {
  try {
    const { content, author } = req.body;
    const mail = new Mail({
      content,
      author: req.user._id,
    });
    
    await mail.save();
    res.status(200).json({ status: "OK", data: mail });
  } catch (error) {
    res.status(400).json({ status: "NOT OK", error: error.message });
  }
};
