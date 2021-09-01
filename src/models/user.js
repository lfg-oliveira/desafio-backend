const mongoose = require('../database/db_connect');
const {encrypt} = require('../cryptman/encrypt');
const nanoid = require('nanoid'); 
const ID_SIZE = 10;

const UserSchema = mongoose.Schema({
	_id: {
		type: String,
		immutable: true
	},
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		select: false
	},
	lastAccess: {
		type: Date
	}

});


UserSchema.pre('save', async function(next){
	const user = this;
	user._id = nanoid.nanoid(ID_SIZE);
	user.password = undefined;
	user.lastAccess = Date.now();

	next();
});

const User = mongoose.model('User', UserSchema);


module.exports = User;
