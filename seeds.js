var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");

var Seeds = [
	{
		name: "Cloud's Rest",
		image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
		description: "The dopest dope you've ever smoked. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Pharetra pharetra massa massa ultricies mi quis hendrerit dolor. Nunc non blandit massa enim nec dui nunc mattis. Sagittis eu volutpat odio facilisis mauris sit amet massa. Sed ullamcorper morbi tincidunt ornare massa eget. Tortor dignissim convallis aenean et. Convallis a cras semper auctor neque vitae tempus quam. Ultrices eros in cursus turpis. Laoreet id donec ultrices tincidunt arcu non sodales neque. Mi bibendum neque egestas congue. Eget duis at tellus at urna condimentum mattis. A scelerisque purus semper eget duis at tellus at. Consequat nisl vel pretium lectus quam id leo. Etiam erat velit scelerisque in dictum. Feugiat sed lectus vestibulum mattis ullamcorper. Maecenas accumsan lacus vel facilisis volutpat est velit. Lobortis elementum nibh tellus molestie.",
		author: {
			id: "5f74c3faf6fce40d79dd1d99",
			username: "Severus"
		}
	},
	{
		name: "Desert Mesa",
		image: "https://images.unsplash.com/photo-1487750404521-0bc4682c48c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
		description: "soooookayyyyyyy. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Pharetra pharetra massa massa ultricies mi quis hendrerit dolor. Nunc non blandit massa enim nec dui nunc mattis. Sagittis eu volutpat odio facilisis mauris sit amet massa. Sed ullamcorper morbi tincidunt ornare massa eget. Tortor dignissim convallis aenean et. Convallis a cras semper auctor neque vitae tempus quam. Ultrices eros in cursus turpis. Laoreet id donec ultrices tincidunt arcu non sodales neque. Mi bibendum neque egestas congue. Eget duis at tellus at urna condimentum mattis. A scelerisque purus semper eget duis at tellus at. Consequat nisl vel pretium lectus quam id leo. Etiam erat velit scelerisque in dictum. Feugiat sed lectus vestibulum mattis ullamcorper. Maecenas accumsan lacus vel facilisis volutpat est velit. Lobortis elementum nibh tellus molestie.",
		author: {
			id: "5f74c3faf6fce40d79dd1d99",
			username: "Severus"
		}
	},
	{
		name: "Canyon Floor",
		image: "https://images.unsplash.com/photo-1571687949921-1306bfb24b72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
		description: "So many cows...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Pharetra pharetra massa massa ultricies mi quis hendrerit dolor. Nunc non blandit massa enim nec dui nunc mattis. Sagittis eu volutpat odio facilisis mauris sit amet massa. Sed ullamcorper morbi tincidunt ornare massa eget. Tortor dignissim convallis aenean et. Convallis a cras semper auctor neque vitae tempus quam. Ultrices eros in cursus turpis. Laoreet id donec ultrices tincidunt arcu non sodales neque. Mi bibendum neque egestas congue. Eget duis at tellus at urna condimentum mattis. A scelerisque purus semper eget duis at tellus at. Consequat nisl vel pretium lectus quam id leo. Etiam erat velit scelerisque in dictum. Feugiat sed lectus vestibulum mattis ullamcorper. Maecenas accumsan lacus vel facilisis volutpat est velit. Lobortis elementum nibh tellus molestie.",
		author: {
			id: "5f74c3faf6fce40d79dd1d99",
			username: "Severus"
		}
	}
];

async function seedDB(){
	try {
		await Campground.deleteMany({});
		console.log("Campgrounds removed")
		await Comment.deleteMany({});
		console.log("Comments removed")
		
		for(const seed of Seeds) {
			let campground = await Campground.create(seed);
			console.log("Campgrounds created")
			let comment = await Comment.create(
				{
					text: "This place is great, but I wish there was internet",
					author: "Homer"
				}
			)
			console.log("comments created")
			campground.comments.push(comment);
			campground.save();
			console.log("comment added to campground")
		}		
	} catch(err) {
		console.log(err);
	}
	
};


// add a few comments

module.exports = seedDB;

