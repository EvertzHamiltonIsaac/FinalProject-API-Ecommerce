//* Routers
const userRouter = require("./MVC/routes/userRouter");
const productRouter = require("./MVC/routes/productRouter");
//* Routers

const express = require("express");
const DBConnect = require("./config/DBConnection");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv").config();
const { notFound, errorHandler } = require("./middlewares/error.middleware");

//* Number of PORT
const port = process.env.PORT || 9000;

//* Connection With DataBase
DBConnect();

//* Configuration of app, this enable or make that the aplication use json files.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//* baseURL = /api/v1/
const baseURL = "/api/v1";
app.use(`${baseURL}`, userRouter);
app.use(`${baseURL}`, productRouter);

//* Handle Errors using middlewares.
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
