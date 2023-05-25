const express = require('express');
const DBConnect = require('./config/DBConnection');
const app = express();
const dotenv = require('dotenv').config();

//Conection With DataBase
DBConnect()

const port = process.env.PORT || 9000;

app.listen(port, () => {
  
  console.log(`Server is running on port ${port}`);
})