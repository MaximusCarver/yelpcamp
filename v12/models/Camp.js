var mongoose = require("mongoose");

mySchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	price: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comment: [
		{
			 type: mongoose.Schema.Types.ObjectId,
			 ref: "comments"
		}
	]
})



module.exports = mongoose.model("Camp", mySchema)