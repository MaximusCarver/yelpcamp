// Variables

var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var Camp = require("./models/Camp");
var comments = require("./models/Comments");
var seedFunc = require("./seeds")
var User = require("./models/User");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");
var indexRoutes = require("./routes/index");

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/Campgrounds9", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")
app.use(express.static("views"))


// Passport Connection Code

app.use(require("express-session")({
		secret: "The Yelpcamp login code",
	resave: false,
	saveUninitialized: false
	
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});


app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(indexRoutes);


passport.use(new LocalStrategy(User.authenticate()));




// Server Connection

app.listen(3000, function(){
	console.log("You've started the server")
})