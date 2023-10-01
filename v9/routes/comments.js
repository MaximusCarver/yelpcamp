var express = require("express");
var router = express.Router();
var Camp = require("../models/Camp");
var comments = require("../models/Comments");

router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
	Camp.findById(req.params.id, function(err, success){
		if(err){
			console.log(err);
		}
		else {
			res.render("comments/new", {campground: success});
		}
	})
})




router.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
	Camp.findById(req.params.id, function(err, success){
		if(err){
			console.log(err);
		}
		 else {
			  comments.create({
				  comment: req.body.PostCommentComment,
				  author: {
					  _id: req.user._id,
					  username: req.user.username
				  }
			  },
				  function(err, created){
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


function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}



module.exports = router;