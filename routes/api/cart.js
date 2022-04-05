/*=======================================================
 Author: [Aditya Bakshi] (aditya.bakshi@dal.ca)
========================================================= */

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const router = express.Router()
router.use(bodyParser.json());

const cart = require('../../models/cartItems');

router.get("/", (req, res) => {
    // fetch all items from the database
    cart.find({}).exec().then(result => {
        console.log('result is' + result)
        if (!result.length) {
            return res.status(404).json({
                message: "No items found",
                success: false,
            })
        }
        return res.status(200).json({
            message: "Items retrieved successfully!",
            success: true,
            courses: result
        })
    }).catch(error => {
        console.log(error)
        return res.status(500).json({
            message: "Internal server errors!!",
            success: "false"
        })
    })
});


router.get("/:userId", (req, res) => {
    // fetch all cart items from the database
    cart.find({ userId: req.params.userId }).exec().then(result => {
        if (!result.length) {
            return res.status(404).json({
                message: "No items found",
                success: false,
            })
        }
        // console.log(result[0].items)
        const items = result[0].items
        let cartTotal = 0
        for(const item of items) {
            cartTotal = cartTotal + Number(item.coursePrice)
        }
        console.log(cartTotal)
        return res.status(200).json({
            message: "Cart Items retrieved successfully!",
            success: true,
            courses: result,
            cartTotal: cartTotal
        })
    }).catch(error => {
        console.log(error)
        return res.status(500).json({
            message: "Internal server errors!!",
            success: "false"
        })
    })
});


router.post("/add", (req, res) => {
    const userId = req.body.userId
    const courseName = req.body.courseName
    const courseImage = req.body.courseImage
    const coursePrice = req.body.coursePrice

    cart.updateOne({ userId: userId }, {
        $addToSet: {
            items: [{
                courseName: courseName,
                courseImage: courseImage,
                coursePrice: coursePrice
            }]
        }
    }, { safe: true, upsert: true }, function (err) {
        if (err) {
            console.log(err)
        }
        else {
            res.status(200).json('Item added to cart')
        }

    })
})


router.delete("/delete", (req, res) => {
    try {
        const userId = req.body.userId
        const courseName = req.body.courseName
        console.log(userId)
        console.log(courseName)

        cart.updateOne({ userId: userId }, {
            $pull: {
                items: {
                    courseName: courseName
                }
            }
        }, { safe: true }, function (err) {
            if (err) {
                console.log(err)
            }
            else {
                res.status(200).json('Item deleted from cart')
            }

        }
        )
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server errors!!",
            success: "false"
        })
    }
})


module.exports = router;