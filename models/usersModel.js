const mongoose = require("mongoose");

const userScehcma = {
  email: { type: String, required: true },
  firstName: String,
  _id: mongoose.Schema.Types.ObjectId,
  password: String,
  lastName: String,
  answer: String
};

module.exports = mongoose.model("registeredusers", userScehcma);
