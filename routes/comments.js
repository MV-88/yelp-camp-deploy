const
	  express    = require("express"),
	  router     = express.Router({mergeParams: true}),
	  Campground = require("../models/campground"),
	  Comment    = require("../models/comment"),
	  middleware = require("../middleware");

// Comments New
router.get("/new", middleware.isLoggedIn, (req, res) =>{
// 	find campground by id
	console.log(req.params.id);
	Campground.findById(req.params.id, (err, campground)=>{
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

// Comments Create
router.post("/", middleware.isLoggedIn, (req, res) =>{
	// lookup campground using ID
	Campground.findById(req.params.id, (err, campground) =>{
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, (err, comment) =>{
				if(err){
					console.log(err);
				} else {
// 					add username and id to comment
					console.log("New comment's username will be: " + req.user.username);
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
// 					save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					req.flash("success", "Successfully Added Comment");
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

// Comments Edit Route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) =>{
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else {
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
	})
});

// Comment Update Route
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) =>{
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) =>{
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// Comment Destroy Route
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) =>{
// 	findByIdAndRemove
	Comment.findByIdAndRemove(req.params.comment_id, (err) =>{
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Comment Deleted");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});


module.exports = router;
