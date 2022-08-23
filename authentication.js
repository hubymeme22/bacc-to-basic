const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

// oh no, some spicy mongoDB (passwords)
const pseudoDatabase = {
	"admin": {
		"password": "$2b$10$Plln5OnlI8R7xC1BN1pumObYoEZ7pODSxmu67v5vSgobb7dHejMPu",
		"level": 1,
		"sec": 3221,
		"data": {
			"name": "Hubert F. Espinola I",
			"gender": "Male",
			"age": 22,
			"diary": {
				"Aug. 22, 2022": ["title", "Content"]
			}
		},
	}
};


// adds a new account
const addAcc = async (res, user, pass, data) => {
	try {
		pseudoDatabase[user] = {
			"password": await bcrypt.hash(pass, 10),
			"level": 2,
			"sec": Math.floor(Math.random() * 0xACE),
			"data": data
		}

		res.status(200).send();
	} catch(e) {
		console.log(e);
		res.status(400).send();
	}
};

// authenticates the credentials
const checkCreds = async (res, user, pass) => {
	if (pseudoDatabase.hasOwnProperty(user)) {
		if (await bcrypt.compare(pass, pseudoDatabase[user].password)) {

			// generate a JWT Session for this account
			const jsonToken = jwt.sign({"username": user, data: pseudoDatabase[user]}, process.env.SERVER_SECRET_TOKEN);
			return res.status(200).json( { "signedToken": jsonToken } );

		} else {
			return res.status(400).send('unsuccessful');
		}
	}

	res.status(400).send('nonexistent account');
};

// shares authority to other accounts
const shareLevel = (res, user1, pass1, nuser) => {
	if (pseudoDatabase[user1] == undefined || pseudoDatabase[nuser] == undefined)
		return res.status(400).send('nonexistent account');

	// check if the new user has more authority than the user
	if (pseudoDatabase[user1] >= pseudoDatabase[nuser])
		return res.status(301).send('no change needed');

	// gets the user's level and share it to newuser
	if (checkCreds(user1, pass1)) {
		pseudoDatabase[nuser].level = pseudoDatabase[user1].level;
		return res.status(200).send('successful');
	}

	res.status(403).send('cannot switch levels');
};

module.exports = {
	'addAcc': addAcc,
	'checkCreds': checkCreds,
	'shareLevel': shareLevel,
	'db': pseudoDatabase
}