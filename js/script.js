"use strict"

const elInput = document.querySelector(".form-input")
const elModalInput = document.querySelector(".modal-input");
const elModalTextarea = document.querySelector(".modal-textarea");
const elModalBtn = document.querySelector(".modal-btn");
const elNotesList = document.querySelector(".notes-list")
const elResult = document.querySelector(".search-result")

const localData = JSON.parse(window.localStorage.getItem("notes"))

// console.log(localData);
const notes = localData || [];

notes.sort()


elNotesList.addEventListener("click", (e) => {
    const deleteBtnId = Number(e.target.dataset.deleteBtnId);
    const foundIndex = notes.findIndex(note => note.id === deleteBtnId);

    if(e.target.matches(".delete-btn")) {
        notes.splice(foundIndex, 1);

        window.localStorage.setItem("notes", JSON.stringify(notes));
        renderNotes(notes, elNotesList);
    } else if (notes.length === 0){
        window.localStorage.removeItem("todos")
    }
})


const renderNotes = function (arr, htmlElement){
    arr.forEach((note) => {

        const newDiv = document.createElement("div")
        const newH1 = document.createElement("h1");
        const newP = document.createElement("p");
        const newDate = document.createElement("P")
        const newDeleteBtn = document.createElement("button");
        // console.log(newDeleteBtn);



        newDeleteBtn.classList.add("delete-btn")
        newDeleteBtn.classList.add("delete-button")
        newH1.setAttribute("class", "ms-5")
        newDiv.setAttribute("class", "bg-primary mt-3 rounded text-white" )
        newDeleteBtn.setAttribute("class", "btn btn-danger ms-5 mt-4 delete-button")

        newDeleteBtn.textContent = "delete"
        newH1.textContent = note.title
        newP.textContent = note.desc
        const timer = setInterval(function () {
            const now = new Date();
            newDate.textContent = `Bu habar ${now.getHours()}:${now.getMinutes()} da yozilgan`
            clearInterval(timer)
        }, 1000)


        newDeleteBtn.dataset.deleteBtnId = note.id

        htmlElement.appendChild(newDiv);
        newDiv.appendChild(newDeleteBtn)
        newDiv.appendChild(newH1);
        newDiv.appendChild(newP)
        newDiv.appendChild(newDate)
    })
}

elInput.addEventListener("input", (evt) => {
    evt.preventDefault();
    let searchRegex = new RegExp(elInput.value.trim(), "gi");

    let array = [];
    notes.forEach(function (note) {
      elNotesList.innerHTML = null;
      if (note.title.match(searchRegex)) {
        array.push(note);
      }
      renderNotes(array, elNotesList);
    });
  });

renderNotes(notes, elNotesList)

elModalBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const inputValue = elModalInput.value;
    const textareaValue = elModalTextarea.value;

    const newNotes = {
        id: notes[notes.length -1]?.id + 1 || 0,
        title: inputValue,
        desc: textareaValue
    }

    notes.push(newNotes);

    window.localStorage.setItem("notes", JSON.stringify(notes))

    elModalInput.value =  null
    elModalTextarea.value = null
    elNotesList.innerHTML = null

    renderNotes(notes, elNotesList )
})
