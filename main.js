const url = 'http://localhost:3000/notes';
const notesList = document.querySelector('#notes-list');

// Render Methods
const renderNote = (data) => {
    const notesItemEl = document.createElement('div');
    notesItemEl.dataset.id = data.id;
    notesItemEl.id = `note-${data.id}`;
    notesItemEl.innerHTML = `
        <div class="note-item-title" contenteditable="true">
            ${data.notesItem}
        </div>
        <div class="note-item-button-wrapper">
            <button class="delete">delete</button>
        </div>
    `;

    notesList.appendChild(notesItemEl);
}

const renderNotes = () => {
    fetch(url)
    .then(res => res.json())
    .then(notesData => {
        for (const item of notesData) {
            renderNote(item);
        }
    })
}

// API Methods
const createNote = () => {
    const notesInput = document.querySelector('#notes-input');
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({notesItem: notesInput.value, created_at: moment().format()
        })
    })
    .then(res => res.json())
    .then(data => {
        renderNote(data);
        deleteText(notesInput);
    })
}

// const updateNote = (ex) => {
//     fetch(url + '/' + ex, {
//         method: 'PUT',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({})
//     })
//     .then(res => res.json())
//     .then(data => {
//         const noteToAdd = document.querySelector(`#note-${id}`);
//     })
// }

const deleteNote = (id) => {
    fetch(url + '/' + id, {
        method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            const itemToRemove = document.querySelector(`#note-${id}`);
            itemToRemove.remove();
        })
}

// Helper Methods
const deleteText = el => {
    el.value = "";
}


//Event Listeners
document.addEventListener('submit', event => {
    event.preventDefault();
    createNote();
})

notesList.addEventListener('click', event => {
    if (event.target.matches('.delete')) {
        let firstParent = event.target.parentElement;
        deleteNote(firstParent.parentElement.dataset.id);
    }
})

renderNotes();

