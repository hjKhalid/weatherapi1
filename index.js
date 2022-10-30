const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/newCollection", {
useNewUrlParser: true,
useUnifiedTopology: true
});

const contactSchema = {
city: String,
day: String,
};

const Contact = mongoose.model("Contact", contactSchema);

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(express.static(__dirname + '/public'));

app.get("/contact", function(req, res){
	res.render("contact");
});

app.post("/contact", function (req, res) {
	
const contact = new Contact({
	city: req.body.city,
	day: req.body.day,
});
contact.save(function (err) {
	if (err) {
		throw err;
	} else {
		res.render("contact");
	}
});
});

app.listen(3000, function(){
	console.log("App is running on Port 3000");
});
