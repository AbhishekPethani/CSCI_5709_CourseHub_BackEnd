/*=======================================================
 Author: [Abhishek Pareshbhai Pethani] (ab823206@dal.ca)
========================================================= */
const mongoose = require('mongoose')

const orderHistorySchema = {
    _id : mongoose.Schema.Types.ObjectId,
    courseName : String, 
    date : Date,
    amount : Number,
    status : String,
    email: String
}

module.exports = mongoose.model("ordersHistory", orderHistorySchema)