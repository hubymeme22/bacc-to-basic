// functions for the whole program
const addNewDiary = (diaryTitle) => {
	const container = document.getElementById('diary-container');
	const code = `<div class="add-diary"><div>${diaryTitle}</div></div>`;
	container.innerHTML = code + container.innerHTML;
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
	addNewDiary(titleInput.value);
	closeForm.onclick();
}