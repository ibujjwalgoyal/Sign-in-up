const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//router addition to server.js
const passport = require("passport");
const users = require("./routes/api/users");

const app = express();

//Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//DB configuration
const db = require("./config/keys").mongoURL;

//connect to MongoDB
mongoose.connect(db,{ newUrlParser: true })
.then(() => console.log("MongoDB connection successfull"))
.catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());
//Passport config
require("./config/passport")(passport);
//Routes
app.use("/api/users", users);

//process.env.port is Heroku's port if you choose to deploy the app there
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running... on port ${port} !`));

