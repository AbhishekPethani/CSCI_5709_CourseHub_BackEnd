/*=======================================================
 Author: [Ridampreet Singh Jaggi] [rd285404@dal.ca]
========================================================= */
const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
var coupon = require("../../models/couponModel");

router.get("/coupons", (req, res) => {
  coupon
    .find()
    .exec()
    .then(result => {
      if (coupon || coupon.length) {
        return res.status(200).json({
          message: "Coupons retrived retrived!!",
          success: true,
          users: result
        });
      }
    })
    .catch(err => {
      console.log(err => {
        return res.status(500).json({
          message: "Internal server error",
          success: false
        });
      });
    });
});
router.post("/add", (req, res) => {
  var couponCode = req.body.name;
  var value = req.body.value;
  var src = req.body.src;

  const newUser = new coupon({
    couponCode,
    _id: new mongoose.Types.ObjectId(),
    value,
    src
  });
  newUser
    .save()
    .then(result => {
      return res.status(201).json({
        message: "Coupon created created",
        success: true
      });
    })
    .catch(err => {
      console.log(err => {
        return res.status(500).json({
          message: "Internal server error",
          success: false
        });
      });
    });
});
module.exports = router;
