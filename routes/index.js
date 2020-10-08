const express  = require("express"),
	  router   = express.Router(),
	  passport = require("passport"),
	  User     = require("../models/user");


// Root Route
router.get("/", (req, res) => {
	res.render("landing");
});

// Show Register Form Route
router.get("/register", (req, res) =>{
	res.render("register");
});

// Handle sign up logic
router.post("/register", (req, res) =>{
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, (err, user) =>{
		if(err){
			req.flash("error", err.message);
			console.log(err);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, () =>{
			req.flash("success", "Welcome To YelpCamp " + user.username);
			res.redirect("/campgrounds");
		});
	});
});


// Show login form 
router.get("/login", (req, res) =>{
	res.render("login");
});

// Handling login logic
router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}), (req, res) =>{
});

// Logout Route
router.get("/logout", (req, res) =>{
	req.logout();
	req.flash('success', 'Logged You Out!');
	res.redirect("/campgrounds");
});

// // Middleware
// function isLoggedIn(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// };


module.exports = router;




