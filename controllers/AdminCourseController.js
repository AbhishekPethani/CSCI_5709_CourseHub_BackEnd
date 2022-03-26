const CourseModel = require("../models/AdminCourseModel");

exports.list = async (req, res, next) => {
  try {
    const courses = await CourseModel.find().exec();
    const transformedCourses = courses.map((course) => course.transform());
    res.json(transformedCourses);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const course = req.body;
    await CourseModel.create(course);
    res.json(course);
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res, next) => {
  const { courseId } = req.params;
  const course = await CourseModel.findById(courseId).exec();
  if (course) {
    res.json(course.transform());
  } else {
    res.status(404).send({ error: "course does not exist" });
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const course = await CourseModel.findByIdAndRemove(courseId).exec();
    const message = course
      ? course.transform()
      : { error: "course does not exist" };
    res.status(200).send(message);
  } catch (error) {
    next(error);
  }
};
exports.replace = (req, res, next) => { };
