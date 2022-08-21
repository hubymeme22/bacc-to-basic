const loginButton = document.getElementById('login');
const regstButton = document.getElementById('register');

loginButton.onclick = () => {
	const username = document.getElementById('user').value;
	const password = document.getElementById('pass').value;

	fetch('/login', {
		"method": "POST",
		"headers": {
			"Content-Type": "application/json",
		},

		"body": JSON.stringify(
			{
				"user": username,
				"pass": password
			})
	})

	.then( response => response.json() )
	.then( data => {

		window.localStorage.setItem('jwt', data.signedToken);
		document.cookie = `weak=${data.signedToken}`;
		window.location.href = 'profile.html';

	})

	.catch( () => {
		document.getElementById('error_container').innerText = 'Login Failed';
	});
};

regstButton.onclick = () => {
	window.location.replace('/registerpage.html');
}