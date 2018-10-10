var Sequelize = require('sequelize');
console.log(typeof process.env.DATABASE_URL)

var seq = new Sequelize('workoutlogchallenge', 'postgres', 'ZnM081417', {
	dialect: 'postgres',
	port: 5432
});


seq.authenticate().then(
	function(){
		console.log("you're connected to the pg database")
	},
	function(err){
		console.log(err)
	}
);

var User = seq.import('./models/user');
var Definition = seq.import('./models/definition')
var Log = seq.import('./models/log')

seq.sync()
module.exports = seq