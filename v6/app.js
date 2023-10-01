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


const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/Campgrounds6", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")
app.use(express.static("views"))


function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

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


passport.use(new LocalStrategy(User.authenticate()));


// Get Requests

app.get("/", function(req, res){
	res.render("HomePage")
})


app.get("/campgrounds", function(req, res){
	CampsiteSearcher = Camp.find({}, function(err, item){
		if(err){
			console.log("ERROR!")
			console.log(err)
		}
		else {
				res.render("campgrounds/Campgrounds", {CampsiteSearcher: item})
			
		}
	})
})


app.get("/PostCampsite", isLoggedIn, function(req, res){
	res.render("campgrounds/PostCampsite")
})
 


app.get("/campgrounds/:id", function(req, res){
	Camp.findById(req.params.id).populate("comment").exec(function(err, success){
		if(err){
			console.log("ERROR!");
			console.log(err);
		}
		else {
			res.render("campgrounds/show.ejs", {campground: success})
		}
	})
})


app.post("/campgrounds", isLoggedIn, function(req, res ){
	name = req.body.PostCampInput;
	image = req.body.PostCampPic;
	des = req.body.PostCampDes;
	Camp.create({
		name: name,
		image: image,
		description: des 
	},
		function(err, item){
		if(err){
			console.log("ERROR!");
			console.log(err)
		}
		else {
			res.redirect("/campgrounds")
		}
	})
})


// Comments Server Requests

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
	Camp.findById(req.params.id, function(err, success){
		if(err){
			console.log(err);
		}
		else {
			res.render("comments/new", {campground: success});
		}
	})
})




app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
	author = req.body.PostCommentAuthor;
	comment = req.body.PostCommentComment;
	Camp.findById(req.params.id, function(err, success){
		if(err){
			console.log(err);
		}
		 else {
			  comments.create({
				  author: author,
				  comment: comment
			  }, function(err, created){
				  if(err){
					  console.log(err);
				  }
				  else {
					  success.comment.push(created);
					  success.save();
					  res.redirect("/campgrounds/" + req.params.id)
				  }
			  })
		 }
	})
})



// Authentication Requests


app.get("/register", function(req, res){
	res.render("register");
})

app.post("/register", function(req, res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, success){
		if(err){
			console.log(err);
		}
		else {
			passport.authenticate("local")(req, res, function(){
				res.redirect("/campgrounds")
			})
		}
	})
})

app.get("/login", function(req, res){
	res.render("login");
})

app.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), function(err, success){
});

app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/")
});








// Server Connection

app.listen(3000, function(){
	console.log("You've started the server")
})