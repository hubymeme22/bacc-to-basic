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
const App   = require('./appMods');

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
app.post('/create', App.validateData, async (req, res) => {
	const username = req.body.user;
	const password = req.body.pass;
	const data = req.body.data
	Auth.addAcc(res, username, password, data);
});

app.post('/login', async (req, res) => {
	const username = req.body.user;
	const password = req.body.pass;
	Auth.checkCreds(res, username, password);
});

app.post('/diary', App.addDiaryNote);

const IP = process.env.IP;
const PORT = process.env.PORT;

app.listen(PORT, IP, () => {
	console.log(`[Server] Listening to http://${IP}:${PORT}`);
});