const pseudoDatabase = require('./authentication').db;
const jwt = require('jsonwebtoken');
const fs = require('fs');

////////////////////////
//  Helper Functions  //
////////////////////////
// adds the diary to the specified user
const addDiary = (user, title, date, content) => {
	if (pseudoDatabase[user]['data']['diary'][date] != undefined)
		return false;

	pseudoDatabase[user]['data']['diary'][date] = [title, content];
	return true;
}

////////////////////////////
//  Middleware functions  //
////////////////////////////
// checks the validity of user data
const checkData = (req, res, next) => {
	const data = req.body.data;
	if (!data) req.body.data = { "name": "Koala Man", "gender": "FMale", "age": 69, "note": "", "diary": {}};

	// checks if the data is not corrupted (hard coded, if corrupted, use the default values)
	if (data.name == undefined)
		req.body.data['name'] = 'Koala Man';
	if (data.gender == undefined)
		req.body.data['gender'] = 'FMale';
	if (data.age == undefined)
		req.body.data['age'] = 69;
	if (data.note == undefined)
		req.body.data['note'] = '';
	if (data.diary == undefined)
		req.body.data['diary'] = {};

	next();
}

// adds a diary for the user
const addDiaryNote = (req, res, next) => {
	if (req.headers['cookie'] == undefined)
		return res.status(403).json({status : 'Invalid Token'});

	// check if the web token is valid
	const jsonToken = req.headers['cookie'].split('=')[1];
	jwt.verify(jsonToken, process.env.SERVER_SECRET_TOKEN, (error, data) => {
		if (error) return res.status(403).json({status: 'Invalid Token'});

		// if valid, add these to the diary
		const title = req.body.title;
		const date  = req.body.date;
		const content = req.body.content;
		const author = data['username'];

		if (addDiary(author, title, date, content))
			return res.status(200).json({status : 'Good'});
		res.status(403).json({status : 'Used Date'});
	});

	next();
}

// retrieves diary of specific user
const retrieveDiary = (req, res, next) => {
	// check if the web token is valid
	const jsonToken = req.headers['cookie'].split('=')[1];
	jwt.verify(jsonToken, process.env.SERVER_SECRET_TOKEN, (error, data) => {
		if (error) return res.status(403).json({status: 'Invalid Token'});
		res.status(200).send(pseudoDatabase[data.username]['data']['diary']);
	});

	next();
}

module.exports = {
	'addDiaryNote' : addDiaryNote,
	'validateData' : checkData,
	'getDiary' : retrieveDiary
}