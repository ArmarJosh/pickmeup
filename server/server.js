var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var index = require("./routes/index");
var bookings = require("./routes/bookings");
var users = require("./routes/users");

var app = express();
var cors = require("cors");

var port = 3000;

app.listen(port, function(){
    console.log("server running on port ", port);
});

// views

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);


// body parser MW

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Routes

app.use("/", index);
app.use("/api", bookings);
app.use("/api", users);

app.use(cors());
