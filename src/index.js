const express = require('express');
const DBConnect = require('./config/DBConnection');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv').config();

//? Routers
const userRouter = require('./MVC/routes/userRouter');

//? Number of PORT
const port = process.env.PORT || 9000;

//? Conection With DataBase
DBConnect()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// TODO: baseURL = /api/v1/
const baseURL = '/api/v1'

app.use(`${baseURL}`, userRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})