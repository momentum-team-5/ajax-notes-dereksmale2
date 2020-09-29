/* moment */

const url = 'http://localhost:3000/notes'

document.addEventListener('submit', function (event) {
    event.preventDefault()
    const notesInput = document.querySelector('#notes-input').value
    console.log(notesInput)

    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({notesItem: notesInput, created_at: moment().format()
        })
    })
    .then(res => res.json())
    .then(data => {
        const notesList = document.querySelector('#new-note')
        const notesItemEl = document.createElement('textarea')
        notesItemEl.innerText = data.notesItem
        notesList.appendChild(notesItemEl)
    })
})

fetch(url)
    .then(res => res.json())
    .then(notesData => {
        const notesList = document.querySelector('#new-note')
        for (const item of notesData) {
            console.log(item)
            const notesItemEl = document.createElement('textarea')
            notesItemEl.innerText = item.notesItem
            notesList.appendChild(notesItemEl)
        }
    })