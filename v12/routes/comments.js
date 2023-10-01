var express = require("express");
var router = express.Router();
var Camp = require("../models/Camp");
var comments = require("../models/Comments");
var middleware = require("../middleware/index");


// Get Requests

router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res){
	Camp.findById(req.params.id, function(err, success){
		if(err){
			console.log(err);
		}
		else {
			res.render("comments/new", {campground: success});
		}
	})
})

router.get("/campgrounds/:id/comments/:commentId/edit", middleware.checkCommentCreator, function(req, res){
	Camp.findById(req.params.id, function(err, foundCamp){
		if(err){
			console.log(err);
		}
		else {
			comments.findById(req.params.commentId, function(err, foundComment){
				if(err){
					console.log(err);
				}
				else {
					res.render("comments/edit", {comment: foundComment, campground:foundCamp});
				}
			})
		}
	})
})


// Post Requests 

router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req, res){
	Camp.findById(req.params.id, function(err, success){
		if(err){
			console.log(err);
		}
		 else {
		  	 comments.create({
				  comment: req.body.PostCommentComment,
				  author: {
					  id: req.user._id,
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
					  req.flash("success", "Comment successfully posted!");
					  res.redirect("/campgrounds/" + req.params.id)
				  }
			  })
		 }
	})
})


// Put Requests 

router.put("/campgrounds/:id/comments/:commentId", middleware.checkCommentCreator, function(req, res){
	comments.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		}
		else {
			req.flash("success", "Comment successfully updated!");
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
});

router.delete("/campgrounds/:id/comments/:commentId", middleware.checkCommentCreator, function(req, res){
	comments.findByIdAndRemove(req.params.commentId, function(err){
		req.flash("success", "Comment successfully deleted.");
		res.redirect("/campgrounds/" + req.params.id);
	})
})





module.exports = router;