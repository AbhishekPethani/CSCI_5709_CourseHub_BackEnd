const mongoose = require("mongoose");

/** Schema for users */
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 120,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 120,
      trim: true,
    },
    email: {
      type: String,
      maxlength: 100,
      trim: true,
      index: true
    },
    coursePurchased: {
      type: 'Number',
    },
  },
  {
    timestamps: true,
  }
);

/** Transform User details */
userSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "id",
      "firstName",
      "lastName",
      "email",
      "coursePurchased",
      "createdAt",
    ];

    fields.forEach((field) => {
      transformed[field] = this[field]?.toString();
    });

    return transformed;
  },
});

module.exports = mongoose.model("users", userSchema);
