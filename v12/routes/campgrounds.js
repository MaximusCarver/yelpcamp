var express = require("express");
var router = express.Router();
var Camp = require("../models/Camp");
var middleware = require("../middleware/index");

// Get Requests

router.get("/campgrounds", function(req, res){
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


router.get("/PostCampsite", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/PostCampsite");
})
 


router.get("/campgrounds/:id", function(req, res){
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

router.get("/campgrounds/:id/edit", middleware.checkCampgroundCreator, function(req, res){
	Camp.findById(req.params.id, function(err, success){
		if(err){
			console.log(err);
		}
		else {
			res.render("campgrounds/edit", {campground: success});
		}
	})
})


// Post Requests

router.post("/campgrounds", middleware.isLoggedIn, function(req, res ){
	name = req.body.PostCampInput;
	image = req.body.PostCampPic;
	des = req.body.PostCampDes;
	price = req.body.PostCampPrice;
	Camp.create({
		name: name,
		image: image,
		description: des,
		price: price,
		author: {
			id: req.user._id,
			username: req.user.username
		}
	},
		function(err, item){
		if(err){
			console.log("ERROR!");
			console.log(err)
		}
		else {
			req.flash("success", "Campground successfully posted!");
			res.redirect("/campgrounds")
		}
	})
})


// Put Requests

router.put("/campgrounds/:id", middleware.checkCampgroundCreator, function(req, res){
	Camp.findByIdAndUpdate(req.params.id, req.body.campground, function(err, foundCamp){
		if(err){
			console.log(err);
		}
		else {
			req.flash("success", "Campground successfully updated.");
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
})

// Delete Requests 
router.delete("/campgrounds/:id", middleware.checkCampgroundCreator, function(req, res){
	Camp.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		}
		else {
			req.flash("success", "Campground successfully removed.");
			res.redirect("/campgrounds");
		}
	})
})





module.exports = router;