const crypto = require('crypto');
const secret = process.env.SECRET_KEY;

async function encrypt(password)
{
	const sha256Hasher = await crypto.createHmac("sha256", secret);
	const hash = sha256Hasher.update(password).digest("hex");
	return hash;
}

async function encryptReqBodyPassword(req)
{
	if(req.body.password != undefined)
	{
		const hash = await encrypt(req.body.password);
		return hash;
	}
	return -1;
}
module.exports = { encrypt, encryptReqBodyPassword }