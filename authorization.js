const jwt = require('jsonwebtoken');
const pseudoDatabase = require('./authentication').db;

const profileAuthorization = (req, res, next) => {
	if (!req.headers['cookie'])
		return res.status(403).send('Invalid Token');

	// verifies the cookie if it's valid
	const jsonToken = req.headers['cookie'].split('=')[1];
	jwt.verify(jsonToken, process.env.SERVER_SECRET_TOKEN, (error, data) => {
		if (error) return res.status(403).send('Invalid Token');

		req.body = data;
		next();
	});
};

module.exports = {
	'profileAuthorize': profileAuthorization
}