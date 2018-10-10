var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/user.js');
var Definition = sequelize.import('../models/definition.js');


router.post('/', function(req, res){
	var description = req.body.definition.desc;
	var logType = req.body.definition.type;
	var owner = req.user.id;
	// console.log(req.User)
	Definition.create({
			description: description, 
			logType : logType, 
			owner : owner
		}).then(
			function createSuccess(definition){
				res.json({
					definition: definition
				})
			}, 
			 function createError(err){
			 	res.send(500, err.message);
			 }
		)
})

router.get('/', function(req, res){
	var userid = req.user.id;

	Definition.findAll({ where: {owner: userid}}).then(
			function findAllSuccess(data){
				res.json(data);
			}, 
			function findAllError(err){
				res.send(500, err.message)
			}
		)
})

module.exports = router;