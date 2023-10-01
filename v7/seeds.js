var mongoose = require("mongoose");
var Camp = require("./models/Camp");
var comments = require("./models/Comments");

itemList = [{
	name: "Mountain Stream",
	image: "https://c4.wallpaperflare.com/wallpaper/264/667/583/5bd3365aeb28f-wallpaper-preview.jpg",
	description: "Flowing stream with green mountains."
},
{
	name: "Vast Mountains",
	image: "https://img.sunset02.com/sites/default/files/styles/4_3_horizontal_inbody_900x506/public/image/2016/07/main/litter-free-campground-sun-0816.jpg",
	description: "Vast, rolling landscape underneath a sprawling mountain range."
},
{
	name: "Moonlit Galaxy",
	image: "http://i.imgur.com/C5nvgBl.jpg",
	description: "Millions of stars above a vast region."
}]

function seedFunc(){
	// itemList.forEach(function(item1){
	// 	Camp.create(item1, function(err, success){
	// 		if(err){
	// 			console.log(err);
	// 		}
	// 		else {
	// 			console.log("Item Created");
	// 			comments.create({
	// 				author: "Michael Crichton",
	// 				comment: "Decent camps, can't get much better"
	// 			}, function(err, item){
	// 				if(err){
	// 					console.log(err);
	// 				}
	// 				else {
	// 					console.log("Comment Created")
	// 					success.comment.push(item);
	// 					success.save()
	// 				}
	// 			})
	// 		}
	// 	})
	// })
}


module.exports = seedFunc;