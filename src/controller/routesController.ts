const {express, app} = require('../server');
const {encryptReqBodyPassword} = require('../cryptman/encrypt');
const User = require('../models/user');
const router = express.Router();

//CREATE
router.post('/register', async (req: { body: { username: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { user?: any; error?: string; }): any; new(): any; }; }; }) =>{
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
router.get('/:userId', async (req: { params: { userId: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { user?: any; error?: string; }): void; new(): any; }; }; }) => {
	User.findById({_id: req.params.userId})
	.lean()
	.then( (user: null) => {
		if(user == null) throw Error;
		res.status(200).json({ user });
	})
	.catch((err: any) => {
		res.status(400).json( {error: 'No user with that ID' } );
	});
});

//UPDATE
router.put('/:userId', async (req: { body: { password: undefined; }; params: { userId: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { doc?: any; error?: string; }): any; new(): any; }; }; }) => {
	// encriptar a senha se houver um campo password no req
	if(req.body.password != undefined){ 
		req.body.password = await encryptReqBodyPassword(req);
	}
	User.findByIdAndUpdate(req.params.userId, req.body, {new: true}, (err: any, doc: null) => {
		if(doc != null){
			console.log(req.body);
			return res.status(200).json({ doc });
		}
		return res.status(400).json({ error: 'Failed to update user with that ID' });
	});
});

//DELETE
router.delete('/:userId',  (req: { params: { userId: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; message?: string; }): any; new(): any; }; }; }) => {
	User.findByIdAndDelete(req.params.userId, (err: any,docs: null) => {
		if(docs == null)
		{
			return res.status(400).json({error: 'Couldn\'t delete the user'});
		}
		return res.status(200).json({message: 'Successfully deleted user'});
	});
});




export function routes(app: any): void {
	app.use('/api/user', router);
}