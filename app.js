const express        = require("express"),
	  app 	         = express(),
 	  bodyParser     = require("body-parser"),
 	  mongoose       = require("mongoose"),
	  flash          = require("connect-flash"),
	  passport       = require("passport"),
	  LocalStrategy  = require("passport-local"),
	  methodOverride = require("method-override"),
	  Campground     = require("./models/campground"),
	  Comment        = require("./models/comment"),
	  User           = require("./models/user"),
	  seedDB	     = require("./seeds");

var   commentRoutes    = require("./routes/comments"),
	  campgroundRoutes = require("./routes/campgrounds"),
	  indexRoutes      = require("./routes/index");

console.log(process.env.DATABASEURL);

// mongodb+srv://Plimpkin88:Mac2Night%25@cluster0.g9mtp.mongodb.net/<dbname>?retryWrites=true&w=majority
// mongodb://localhost/yelp_camp_v12_dynamic
const url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v12_dynamic";

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})
.then(()=> console.log("Connected!"))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seed the database
// seedDB(); 


// Passport Configuration
app.use(require("express-session")({
	secret: "Once again Rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) =>{
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is listening on port ${ PORT }`);
});


// app.listen("3000", function(){
// 	console.log("The YelpCamp Server Has Started!")
// });




