var express = require("express");
var router = express.Router();
var Camp = require("../models/Camp");

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


router.get("/PostCampsite", isLoggedIn, function(req, res){
	res.render("campgrounds/PostCampsite")
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


router.post("/campgrounds", isLoggedIn, function(req, res ){
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



function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}



module.exports = router;