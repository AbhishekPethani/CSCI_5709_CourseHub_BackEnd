const express = require('express');
const courseController = require('../controllers/AdminCourseController');

const router = express.Router();

router.route("/").get(courseController.list).post(courseController.create);

router
  .route("/:courseId")
  .get(courseController.get)
  .put(courseController.replace)
  .delete(courseController.remove);

module.exports = router;
