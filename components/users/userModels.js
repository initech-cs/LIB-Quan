const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = mongoose.Schema(
  {
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
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Mail",
        },
      ],
    },
    receivedMails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mail",
    },
    corresponders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    tokens: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.methods.generateToken = async function () {
  const token = jwt.sign(
    { _id: this._id, username: this.username, email: this.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "14d",
    }
  );
  this.tokens.push(token);
  await this.save();
  return token;
};

userSchema.methods.toJSON = function () {
  const userObj = this.toObject();
  delete userObj.password;
  delete userObj._id;
  delete userObj.__v;
  delete userObj.id;
  delete userObj.tokens;
  return userObj;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
