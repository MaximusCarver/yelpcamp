// Variables

express = require("express")
app = express()
bodyParser = require("body-parser")
Camp = require("./models/Camp");
comments = require("./models/Comments");
seedFunc = require("./seeds")
// mongoose = require("mongoose")
// mongoose.connect("mongodb://localhost/Campgrounds")

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/Campgrounds5", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")
app.use(express.static("views"))


seedFunc();

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


app.get("/PostCampsite", function(req, res){
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


// Post Requests

app.post("/campgrounds", function(req, res ){
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

app.get("/campgrounds/:id/comments/new", function(req, res){
	Camp.findById(req.params.id, function(err, success){
		if(err){
			console.log(err);
		}
		else {
			res.render("comments/new", {campground: success});
		}
	})
})




app.post("/campgrounds/:id/comments", function(req, res){
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






app.listen(3000, function(){
	console.log("You've started the server")
})