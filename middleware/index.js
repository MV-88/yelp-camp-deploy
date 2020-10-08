// All middleware goes here
const Campground = require("../models/campground"),
	  Comment    = require("../models/comment"),
	  middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				req.flash("error", "Campground Not Found");
				res.redirect("back");
			} else {
				// 	does user own the campground?
				// if(campground.author.id === req.user._id)
// 				the above won't work because 'foundCampground.author.id' is an object 
// 				and req.user._id is a string
// 				use built-in mongoose method:
				if(foundCampground.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You Don't Have Permission To Do That");
					res.redirect("back");
				}
			}
		});
	} else {
// 		does the user own the campground?
		console.log("You need to be logged in to do that!!!");
		res.redirect("back");
	}
};


middlewareObj.checkCommentOwnership = function(req, res, next) {
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				res.redirect("back");
			} else {
// 			Does the user own the comment
				if(foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You Don't Have Permission To Do That");
					res.redirect("back");
				}
			}
		});
	} else {
// 		does the user own the comment?
		req.flash("error", "You need to be logged in to do that!!!");
		res.redirect("back");
	}
};


middlewareObj.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You Need To Be Logged In To Do That");
	res.redirect("/login");
};

module.exports = middlewareObj;















