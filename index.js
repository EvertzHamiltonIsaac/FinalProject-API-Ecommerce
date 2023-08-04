//* Routers
require("dotenv").config()

const userRouter = require("./src/MVC/routes/userRouter");
const productRouter = require("./src/MVC/routes/productRouter");
const blogRouter = require("./src/MVC/routes/blogRouter");
const productoCategoryRouter = require("./src/MVC/routes/productoCategoryRouter");
const blogCategoryRouter = require("./src/MVC/routes/blogCategoryRouter");
const brandRouter = require("./src/MVC/routes/brandRouter");
const colorRouter = require("./src/MVC/routes/colorRouter");
const couponRouter = require("./src/MVC/routes/couponRouter");
const enquiryRouter = require("./src/MVC/routes/enquiryRouter");
const paymentRouter = require("./src/MVC/routes/paymentRouter");
const ordersRouter = require("./src/MVC/routes/ordersRouter");
const uploadImgRouter = require("./src/MVC/routes/uploadImgRouter");
//* Routers

const express = require("express");
const DBConnect = require("./src/config/DBConnection");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const { notFound, errorHandler } = require("./src/middlewares/error.middleware");
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
app.use(`${baseURL}`, paymentRouter);
app.use(`${baseURL}`, ordersRouter);
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
