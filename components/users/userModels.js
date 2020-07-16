const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "User name is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
  },
  mails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mail",
  },
  receivedMails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mail",
  },
  corresponders: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tokens: [{
      type: String
  }],
});

userSchema.methods.generateToken = async function () {
   
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "14d",
  });
  this.tokens.push(token);
  await this.save();
  return token;
};

userSchema.pre("save", async function () {
    // let password = bcryp
})

const User = mongoose.model("User", userSchema);

module.exports = User;
