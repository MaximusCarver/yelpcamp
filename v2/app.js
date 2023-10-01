// Variables

express = require("express")
app = express()
bodyParser = require("body-parser")

// mongoose = require("mongoose")
// mongoose.connect("mongodb://localhost/Campgrounds")

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/Campgrounds", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")
app.use(express.static("views"))


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
				res.render("Campgrounds", {CampsiteSearcher: item})
			
		}
	})
})


app.get("/PostCampsite", function(req, res){
	res.render("PostCampsite")
})
 


app.get("/campgrounds/:id", function(req, res){
	Camp.findById(req.params.id, function(err, success){
		if(err){
			console.log("ERROR!");
			console.log(err);
		}
		else {
			res.render("show.ejs", {campground: success})
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



// Mongoose


mySchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
})


Camp = mongoose.model("Camp", mySchema)









app.listen(3000, function(){
	console.log("You've started the server")
})