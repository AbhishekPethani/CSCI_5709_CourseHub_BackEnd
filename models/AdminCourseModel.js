/*=======================================================
 Author: [Sourav Malik] (sr343164@dal.ca)
 This feature is not a part of assignment 3. It is built for the project.
========================================================= */

const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 120,
      trim: true,
    },
    authorName: {
      type: String,
      maxlength: 120,
      trim: true,
    },
    courseDescription: {
      type: String,
      maxlength: 1200,
      trim: true,
    },
    coursePrice: {
      type: mongoose.Decimal128,
    },
    courseCategory: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

courseSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "id",
      "courseName",
      "authorName",
      "courseDescription",
      "coursePrice",
      "courseCategory",
      "createdAt",
    ];

    fields.forEach((field) => {
      transformed[field] = this[field]?.toString();
    });

    return transformed;
  },
});

module.exports = mongoose.model("Course", courseSchema);
