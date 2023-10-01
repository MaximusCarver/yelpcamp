var express = require("express");
var router = express.Router();
var User = require("../models/User");
var passport = require("passport")

router.get("/", function(req, res){
	res.render("HomePage")
})

router.get("/register", function(req, res){
	res.render("register");
})

router.post("/register", function(req, res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, success){
		if(err){
			req.flash("error", err.message);
			res.redirect("back");		
		}
		else {
				passport.authenticate("local")(req, res, function(err, success){
				req.flash("success", "Welcome " + req.body.username);
				res.redirect("/campgrounds");
			})
		}
	})
})

router.get("/login", function(req, res){
	res.render("login");
})

router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), function(err, success){
});

router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Successfully logged you out!");
	res.redirect("/")
});



module.exports = router;