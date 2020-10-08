const
	  express = require("express"),
	  router  = express.Router(),
	  Campground = require("../models/campground"),
	  middleware = require("../middleware");


// Index route - show all campgrounds
router.get("/", (req, res) => {
// 	Get all campgrounds from DB
	// console.log(req.user);
	Campground.find({}, (err, allCampgrounds)=>{
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
		}
	})
});

// Create route - addd new campground to DB 
router.post("/", middleware.isLoggedIn, (req, res) =>{
// 	get data from form and add to campgrounds array
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name, price: price, image: image, description: desc, author:author};
// 	Create a new campground and save to DB
	Campground.create(newCampground, (err, newlyCreated)=>{
		if(err){
			console.log(err);
		} else {
			console.log(newlyCreated);
			res.redirect("/campgrounds");
		}
	});
});


// New route - show form to create new campground
router.get("/new", middleware.isLoggedIn, (req,res) =>{
	res.render("campgrounds/new");
});

// Show route - shows more info about one campground
router.get("/:id", (req, res)=>{
// 	Find the campground with the provided ID
	Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) =>{
		if(err){
			console.log(err);
		} else {
			console.log(foundCampground);
// 			Render Show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

// Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) =>{
	Campground.findById(req.params.id, function(err, foundCampground) {
		res.render("campgrounds/edit", {campground: foundCampground});
	});
});

// Update Campground Route
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) =>{
// 	find and update the corrct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) =>{
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// Destroy Campground Route
// router.delete("/:id", (req, res) =>{
// 	Campground.findByIdAndRemove(req.params.id, (err)=>{
// 		if(err){
// 			res.redirect("/campgrounds");
// 		} else {
// 			res.redirect("/campgrounds");
// 		}
// 	})
// });


router.delete("/:id", middleware.checkCampgroundOwnership, async(req, res) =>{
	try{
		let foundCampground = await Campground.findById(req.params.id);
		await foundCampground.remove();
		res.redirect("/campgrounds");
	} catch (error) {
		console.log(error.message);
		res.redirect("/campgrounds");
	}
});


module.exports = router;



