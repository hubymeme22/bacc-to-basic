require('dotenv').config();

const express = require('express');
const app = express();

const outputLogger = require('./outputLogger');
const bodyParser   = require('body-parser');

app.use(outputLogger);
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('src'));

const Auth  = require('./authentication');
const AuthR = require('./authorization');

//////////////////////
//   GET requests   //
//////////////////////
app.get('/', (req, res) => {
	res.redirect('loginpage.html');
});

app.get('/profile', AuthR.profileAuthorize, (req, res) => {
	const username = req.body.username;
	res.send(Auth.db[username]);
});

///////////////////////
//   POST requests   //
///////////////////////
app.post('/create', async (req, res) => {
	const username = req.body.user;
	const password = req.body.pass;
	let data = req.body.data

	if (!data) data = { "name": "Koala Man", "gender": "FMale", "age": 69, "note": "" };
	Auth.addAcc(res, username, password, data);
});

app.post('/login', async (req, res) => {
	const username = req.body.user;
	const password = req.body.pass;
	Auth.checkCreds(res, username, password);
});

const IP = process.env.IP;
const PORT = process.env.PORT;

app.listen(PORT, IP, () => {
	console.log(`[Server] Listening to http://${IP}:${PORT}`);
});