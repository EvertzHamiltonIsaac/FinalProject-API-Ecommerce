//* Routers
const userRouter = require("./MVC/routes/userRouter");
const productRouter = require("./MVC/routes/productRouter");
const blogRouter = require("./MVC/routes/blogRouter");
const productoCategoryRouter = require("./MVC/routes/productoCategoryRouter");
const blogCategoryRouter = require("./MVC/routes/blogCategoryRouter");
const brandRouter = require("./MVC/routes/brandRouter");
const colorRouter = require("./MVC/routes/colorRouter");
const couponRouter = require("./MVC/routes/couponRouter");
const enquiryRouter = require("./MVC/routes/enquiryRouter");
const uploadImgRouter = require("./MVC/routes/uploadImgRouter");
//* Routers

const express = require("express");
const DBConnect = require("./config/DBConnection");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const { notFound, errorHandler } = require("./middlewares/error.middleware");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//* PORT Number
const port = process.env.PORT || 9000;

//* Connection With DataBase
DBConnect();

//* Configuration of app, this enable or make that the aplication use json files.
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//* baseURL = /api/v1/
const baseURL = "/api/v1";
app.use(`${baseURL}`, userRouter);
app.use(`${baseURL}`, productRouter);
app.use(`${baseURL}`, blogRouter);
app.use(`${baseURL}`, productoCategoryRouter);
app.use(`${baseURL}`, blogCategoryRouter);
app.use(`${baseURL}`, brandRouter);
app.use(`${baseURL}`, colorRouter);
app.use(`${baseURL}`, enquiryRouter);
app.use(`${baseURL}`, couponRouter);
app.use(`${baseURL}`, uploadImgRouter);

//* Handle Errors using middlewares.
app.use(notFound);
app.use(errorHandler);

app.get(baseURL, function (req, res, next) {
  res.json({ msg: "All Working Fine" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
