const crypto = require('crypto');
const secret = process.env.SECRET_KEY;

export async function encrypt(password: String)
{
	const sha256Hasher = await crypto.createHmac("sha256", secret);
	const hash = sha256Hasher.update(password).digest("hex");
	return hash;
}

export async function encryptReqBodyPassword(req: any)
{
	if(req.body.password != undefined)
	{
		const hash = await encrypt(req.body.password);
		return hash;
	}
	return -1;
}