var Camp = require("../models/Camp");
var comments = require("../models/Comments");

var middlewareObject = {};

middlewareObject.isLoggedIn = function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You must be logged in to do that.");
	res.redirect("/login");
};

middlewareObject.checkCampgroundCreator = function checkCampgroundCreator(req, res, next){
	if(req.isAuthenticated()){
		Camp.findById(req.params.id, function(err, foundCamp){
			if(err){
				console.log(err);
			}
			else {
				if(foundCamp.author.id.equals(req.user._id)){
					next();
				}
				else {
					req.flash("error", "You can only edit your own campgrounds.");
					res.redirect("back");
				}
			}
		})
	}
	else {
		req.flash("error", "You must be logged in to do that.");
		res.redirect("/login");	
	}
};

middlewareObject.checkCommentCreator = function checkCommentCreator(req, res, next){
	if(req.isAuthenticated()){
		comments.findById(req.params.commentId, function(err, foundComment){
			if(err){
				res.redirect("back");
			}
			else {
				if(foundComment.author.id.equals(req.user._id)){
					next();
				}
				else {
					req.flash("error", "You can only edit your own comment.");
					res.redirect("back");
				}
			}
		})
	}
	else {
		req.flash("error", "You must be logged in to do that.");
		res.redirect("/login");
	}
};




module.exports = middlewareObject;