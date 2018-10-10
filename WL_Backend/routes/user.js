const router = require('express').Router();
const sequelize = require('../db.js');
const User = sequelize.import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path')

const upload = multer({
	storage: multer.diskStorage({
		destination: function(req, file, cb){
			// this is the call back function that will be called when multer is searching for where to place the file
			// the callback is organized his this cb(err, filepath), since there us no err we are going to pass a null value
			cb(null, './uploads/');
		},
		filename: function(req, file, cb) {
			cb(null, req.user.id + Date.now()+ path.extname(file.originalname))
		}
	}), 
	fileFilter: (req, file, cb) => {
		if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
			return cb(null, true);
		} else {
			return cb(null, false);
		}
	},
	limits : 1024 * 1024 * 5
})


router.post('/', function(req, res){

	User.create({
		username : req.body.user.username,
		passwordhash : bcrypt.hashSync(req.body.user.password, 10)
	}).then(
		function createSuccess(user){
			const token = jwt.sign({id:user.id}, 'Secret', {expiresIn: 60*60*24})
			res.json({
				user : user,
				message: 'create',
				sessionToken: token
			})
		},
		function createError(err){
			res.json({
				statuscode: 500, 
				error: err.message
			})
		}
	)
})

router.post('/upload-image', upload.single('image'), (req,res) => {
	console.log(req.body)
	console.log(req.file);
	User.findOne({ where: { id: req.user.id } }).then(
		(user) => {
			const _user = user;
			User.update({
				img: req.file.path
			}, { where: { id: user.id } }).then(
				(updateSuccess) => {
					res.json({
						message: 'image was added',
						imgRoute: _user.img
					});
				},
				(err) => {
					res.json({error: err})
				}
			)
			
		},
		(err) => {
			res.json('there was an error', err)
		}
	)
})

// router.get('/user-details', (req,res))

module.exports = router;