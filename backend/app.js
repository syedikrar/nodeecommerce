const express = require('express');
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require('cookie-parser');
app.use(express.json()); // for parsing data into the server
app.use(cookieParser());
// importing routes here
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use(errorMiddleware);

module.exports = app