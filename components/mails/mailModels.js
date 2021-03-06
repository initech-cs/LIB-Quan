const mongoose = require("mongoose");
const User = require("../users/userModels");

const mailSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  content: {
    type: String,
    required: [true, "Mail content is missing"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Author is required"],
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  reader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

mailSchema.pre("save", async function (next) {
  const user = await User.findOne({ _id: this.author });

  user.mails.push(this);
  await user.save();
  // console.log(user)
  next();
});

const Mail = mongoose.model("Mail", mailSchema);
module.exports = Mail;
