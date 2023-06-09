require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express()
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('uploads'));

const cmsRoutes = require('./routes/cmsRoutes')
app.use('/', cmsRoutes )

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started!");
});