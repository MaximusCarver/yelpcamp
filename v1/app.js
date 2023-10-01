express = require("express")

app = express()

bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}));

CampList = [{name: "Triassic Camp",img:"https://blog-assets.thedyrt.com/uploads/2019/03/shutterstock_701674054-1.jpg"},{name: "Beaver's River",img: "https://www.daytrippen.com/wp-content/uploads/2018/12/hobo-campground-kern-river.jpg"},{name: "Wren's Clearing",img: "https://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5404361.jpg"},{name: "Dove Heights",img: "https://blog-assets.thedyrt.com/uploads/2019/05/shutterstock_309662555-1.jpg"}]

app.set("view engine", "ejs")

app.use(express.static("views"))

app.get("/", function(req, res){
	res.render("HomePage")
})

app.get("/campgrounds", function(req, res){
	res.render("Campgrounds", {CampGrounds: CampList})
})

app.get("/PostCampsite", function(req, res){
	res.render("PostCampsite")
})


app.post("/campgrounds", function(req, res ){
	CampName = req.body.PostCampInput
	CampPic = req.body.PostCampPic
	CampObj = {name: CampName, img: CampPic}
	CampList.push(CampObj)
	res.redirect("/campgrounds")
})



app.listen(3000, function(){
	console.log("You've started the server")
})