const continueButton = document.getElementById('continue-app');
const diaryButton = document.getElementById('diary-div');
const notesButton = document.getElementById('notes-div');


continueButton.onclick = () => {
	window.location.replace('#app-container');
};

diaryButton.onclick = () => {
	window.location.href = '/diaryapp.html';
}

notesButton.onclick = () => {
	window.location.href = '#';
}