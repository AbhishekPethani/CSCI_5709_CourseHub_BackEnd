const express = require("express");
const courseRouter = require("./AdminCourseRoute");
const userRouter = require("./AdminUserRoute");

const router = express.Router();

router.use("/course", courseRouter);
router.use("/user", userRouter);

module.exports = router;