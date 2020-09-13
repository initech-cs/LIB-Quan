const Mail = require("./mailModels");
const User = require("../users/userModels");

exports.createMail = async (req, res) => {
  try {
    const { content, send } = req.body;
    const mail = new Mail({
      content,
      author: req.user._id,
    });

    await mail.save();
    if (send) {
      const user = await User.findOne({ _id: send });
      user.mails.push(mail)
      await user.save();
    }
    res.status(200).json({ status: "OK", data: mail, sentTo: send });
  } catch (error) {
    res.status(400).json({ status: "NOT OK", error: error.message });
  }
};

exports.getMails = async (req, res) => {
  try {
    const mails = await Mail.find();
    return res.status(200).json({ status: "OK", data: mails });
  } catch (error) {
    res.status(404).json({ status: "NOT OK", error: error.message });
  }
};

exports.getOneMail = async (req, res) => {
  const { _id } = req.body;
  try {
    const mail = await Mail.findById(_id);
    res.status(200).json({ status: "OK", mail });
  } catch (err) {
    res.status(400).json({ status: "NOT OK", error: err.message });
  }
};

exports.deleteMail = async (req, res) => {
  console.log(req.params);
  try {
    const { id } = req.params;
    await Mail.findOneAndDelete({ _id: id });
    res.status(200).json({ status: "OK", message: "Mail is deleted" });
  } catch (error) {
    res.status(400).json({ status: "NOT OK", error: error.message });
  }
};
