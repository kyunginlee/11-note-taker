// Packages required for application
const fs = require("fs");
const path = require('path');
const express = require("express");

//start new server to listen to port value 3000
const app = express();
const port = process.env.PORT || 3000;

// Setup data parsing
app.use(express.urlencoded({ extended: true }));

// Parse incoming data
app.use(express.json());
app.use(express.static(__dirname));
require('./routes/routes')(app);

// Listening on port 3000
app.listen(PORT, () => {
    console.log(`Listening on PORT: "${PORT}!`);
}); 