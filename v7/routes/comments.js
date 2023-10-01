var express = require("express");
var router = express.Router();
var Camp = require("../models/Camp");

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


function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}



module.exports = router;