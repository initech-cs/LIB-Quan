const mongoose = require("mongoose");

const mailSchema = mongoose.Schema({
  content: {
    type: String,
    required: [true, "Mail content is missing"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Author is required"],
  },
  reader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Mail = mongoose.model("Mail", mailSchema);
module.exports = Mail;
