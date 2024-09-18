const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function addTask() {
    if (inputBox.value === '') {
        alert('You must write something!');
        return;
    }

    const li = document.createElement('li');
    li.innerText = inputBox.value;

    const span = document.createElement('span');
    span.innerHTML = '&times;'; // Cross icon

    span.onclick = function () {
        li.remove();
        saveData();
    };

    li.appendChild(span);
    li.onclick = function () {
        li.classList.toggle('checked');
        saveData();
    };

    listContainer.appendChild(li);
    inputBox.value = '';
    saveData();
}

function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
}

function showList() {
    listContainer.innerHTML = localStorage.getItem('data') || '';
    const listItems = listContainer.getElementsByTagName('li');

    for (let item of listItems) {
        item.onclick = function () {
            item.classList.toggle('checked');
            saveData();
        };

        const span = item.getElementsByTagName('span')[0];
        if (span) {
            span.onclick = function () {
                item.remove();
                saveData();
            };
        }
    }
}

// Load saved tasks on page load
window.onload = showList;
