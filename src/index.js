//* Routers
const userRouter = require("./MVC/routes/userRouter");
const productRouter = require("./MVC/routes/productRouter");
const blogRouter = require("./MVC/routes/blogRouter");
const brandRouter = require("./MVC/routes/brandRouter");
//* Routers

const express = require("express");
const DBConnect = require("./config/DBConnection");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv").config();
const morgan = require("morgan")
const { notFound, errorHandler } = require("./middlewares/error.middleware");
const cookieParser = require("cookie-parser");

//* PORT Number
const port = process.env.PORT || 9000;

//* Connection With DataBase
DBConnect();

//* Configuration of app, this enable or make that the aplication use json files.
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//* baseURL = /api/v1/
const baseURL = "/api/v1";
app.use(`${baseURL}`, userRouter);
app.use(`${baseURL}`, productRouter);
app.use(`${baseURL}`, blogRouter);
app.use(`${baseURL}`, brandRouter);


//* Handle Errors using middlewares.
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
