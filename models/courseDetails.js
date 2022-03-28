const mongoose = require('mongoose')

const courseDetailsSchema = {
    _id : mongoose.Schema.Types.ObjectId,
    courseName : String,
    courseCategory : String,
    courseDescription : String,
    coursePrice : Number,
    courseImage : String,
    courseAuthor : String,
    purchasedBy : Array
}

module.exports = mongoose.model("Courses", courseDetailsSchema);