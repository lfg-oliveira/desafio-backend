const express = require('express');
const {encryptReqBodyPassword} = require('../cryptman/encrypt');
const User = require('../models/user');
const router = express.Router();

//CREATE
router.post('/register', async (req, res) =>{
	const { username } = req.body;
	try {
		const user = await User.create(req.body);
		return res.status(200).json({user});
	} 
	catch (err) {
		if(await User.findOne({ username }))
		{
			return res.status(400).json({ error: 'User already registered' });
		}
		return res.status(400).json({error: 'Registration failed'})
	}
});

//READ
router.get('/:userId', async (req, res) => {
	User.findById({_id: req.params.userId})
	.lean()
	.then( user => {
		if(user == null) throw error;
		res.status(200).json({ user });
	})
	.catch(err => {
		res.status(400).json( {error: 'No user with that ID' } );
	});
});

//UPDATE
router.put('/:userId', async (req, res) => {
	if(req.body.password != undefined){
		req.body.password = await encryptReqBodyPassword(req);
	}
	User.findByIdAndUpdate(req.params.userId, req.body, {new: true}, (err, doc) => {
		if(doc != null){
			console.log(req.body);
			return res.status(200).json({ doc });
		}
		return res.status(400).json({ error: 'Failed to update user with that ID' });
	});
});

//DELETE
router.delete('/:userId',  (req, res) => {
	User.findByIdAndDelete(req.params.userId, (err,docs) => {
		if(docs == null)
		{
			return res.status(400).json({error: 'Couldn\'t delete the user'});
		}
		return res.status(200).json({message: 'Successfully deleted user'});
	});
});

module.exports = (app) => {
	app.use('/api/user', router);
}