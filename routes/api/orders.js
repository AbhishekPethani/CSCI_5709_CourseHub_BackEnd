/*=======================================================
 Author: [Abhishek Pareshbhai Pethani] (ab823206@dal.ca)
========================================================= */
const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()
router.use(bodyParser.json());

const orderHistory = require('../../models/orderHistory')

router.get("/:email", (req, res) => { 
    // fetch all the order history for specified email id from the database
    orderHistory.find({ email: req.params.email }).exec().then(result => {
        console.log(result)
        if(! result.length) {
            return res.status(404).json({
                message: "No order hisotry available for " + req.params.email,
                success: false,
            })    
        }
        return res.status(200).json({
            message: "Order History for the " + req.params.email + " are retrieved successfully!",
            success: true,
            orderHistory: result
        })
    }).catch(error => {
        console.log(error)
        return res.status(500).json({
            message:"Internal server errors!!", 
            success:"false"
        })
    })
})

module.exports = router