const Mail = require("./mailModels");
const User = require("../users/userModels");

exports.createMail = async (req, res) => {
  try {
    const { title, content, send } = req.body;
    const mail = new Mail({
      title,
      content,
      author: req.user._id,
    });

    if (send) {
      try {
        const user = await User.findOne({ _id: send });
        mail.isPrivate = true;
        await mail.save();
        user.mails.push(mail);

        if (req.user.corresponders) {
          req.user.corresponders.includes(send)
            ? null
            : req.user.corresponders.push(send);
        }
        await req.user.save();
      } catch (err) {
        res.status(400).json({ status: "NOT OK", error: err.message });
      }
    }
    await mail.save();
    res.status(200).json({ status: "OK", data: mail, sentTo: send });
  } catch (error) {
    res.status(400).json({ status: "NOT OK", error: error.message });
  }
};

exports.getMails = async (req, res) => {
  try {
    const mails = await Mail.find({ isPrivate: false });
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
  try {
    const { id } = req.params;
    await Mail.findOneAndDelete({ _id: id });
    res.status(200).json({ status: "OK", message: "Mail is deleted" });
  } catch (error) {
    res.status(400).json({ status: "NOT OK", error: error.message });
  }
};
