// functions for the whole program
let diaryData = {};
const addNewDiary = (diaryTitle) => {
	if (diaryTitle === '') return;

	const container = document.getElementById('place-diary-here');
	const code = `<div class="add-diary"><div>${diaryTitle}</div></div>`;
	container.innerHTML += code;
}

const postDiary = (title, date, content) => {
	fetch('/diary', {
		"method": "POST",
		"headers": {
			"Content-Type": "application/json",
			"Cookie": window.Cookie
		},
		"body": JSON.stringify({
			"title": title,
			"date": date,
			"content": content
		})
	})

	.then( response => { return response.json() })
	.then( response => {
		addNewDiary(title);
	})

	.catch( error => {
		alert('Bad Request');
	});
}

const getDiary = () => {
	fetch('/diary', {
		"headers": {
			"Cookie": window.Cookie
		}
	})
		.then( response => { return response.json() })
		.then( response => {
			diaryData = response;
			console.log(diaryData);
			Object.keys(diaryData).forEach(key => {
				addNewDiary(diaryData[key][0]);
			});
		})

		.catch( error => {
			window.location.href = '/errors/403.html';
		});
}

// Initial interface part
const back = document.getElementById('go-back');
const diary = document.getElementById('add-new-diary');

back.onclick = () => {
	window.location.href = '/profile.html';
}

diary.onclick = () => {
	// displays the form
	const diaryInput = document.getElementById('diary-input');
	const diaryDate = document.getElementById('date-input');

	diaryInput.style.display = '';
	diaryInput.classList.add('fadeInUpwards');
	diaryInput.classList.remove('fadeOut');

	// retrieves the current date
	const dateArray = (new Date()).toString().split(' ');
	const currentDate = `${dateArray[1]}. ${dateArray[2]}, ${dateArray[3]} ${dateArray[0]}`;
	diaryDate.value = currentDate;
}

// hovering interface part (diary input)
const addDiaryNote = document.getElementById('add-diary');
const closeForm  = document.getElementById('close-diary');

closeForm.onclick = () => {
	const diaryInput = document.getElementById('diary-input');
	diaryInput.classList.add('fadeOut');
	diaryInput.classList.remove('fadeInUpwards');

	setTimeout(() => {
		diaryInput.style.display = 'none';
	}, 1000);
}

addDiaryNote.onclick = () => {
	const titleInput = document.getElementById('title-input');
	const dateInput  = document.getElementById('date-input');
	const contentInput = document.getElementById('diary-content');

	postDiary(titleInput.value, dateInput.value, contentInput.value);

	// clears input field
	titleInput.value = '';
	dateInput.value = '';
	contentInput.value = '';

	closeForm.onclick();
}

getDiary();