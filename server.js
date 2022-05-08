// Import packages required for application
const fs = require("fs");
const path = require('path');
const express = require("express");
const app = express();
//start new server to listen to port value 3000
const port = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

require('./routes/routes')(app);

// Launch app on port 3001
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
