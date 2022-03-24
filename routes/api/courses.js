const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const router = express.Router()
router.use(bodyParser.json());

const courses = require('../../models/CourseDetails');

router.get("/", (req, res) => { 
    // fetch all courses from the database
    courses.find({}).exec().then(result => {
        if(! result.length) {
            return res.status(404).json({
                message: "No courses found",
                success: false,
            })    
        }
        return res.status(200).json({
            message: "Courses retrieved successfully!",
            success: true,
            reviews: result
        })
    }).catch(error => {
        console.log(error)
        return res.status(500).json({
            message:"Internal server errors!!", 
            success:"false"
        })
    })
});

module.exports = router;