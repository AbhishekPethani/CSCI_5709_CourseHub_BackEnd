const express = require("express");
const mongoose = require("mongoose");
const reviewRoute = require("./routes/api/reviews");
const courseRoute = require("./routes/api/courses");
const adminCourseRoute = require("./routes/AdminCourseRoute");
const adminUserRoute = require("./routes/AdminUserRoute");
const wishilistRoutes = require("./routes/api/WishlistRoutes");
const userRoute = require("./routes/api/users");
const couponsRoute = require("./routes/api/coupons");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log(adminCourseRoute)
const mongoDBUrl = "mongodb+srv://abhishek:abhishek@cluster0.2spzc.mongodb.net/CourseHub?retryWrites=true&w=majority";
mongoose
  .connect(mongoDBUrl, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch(error => {
    console.log("mongoDB connection failed", error);
  });

app.use(express.static("public"));
app.use("/images", express.static("images"));

app.use("/reviews", reviewRoute);
app.use("/courses", courseRoute);
// app.use("/admin", routes);
app.use("/wishlist", wishilistRoutes);
app.use("/authenticate", userRoute);
app.use("/coupons", couponsRoute);
app.use("admin/course", adminCourseRoute);
app.use("admin/user", adminUserRoute);

module.exports = app;
