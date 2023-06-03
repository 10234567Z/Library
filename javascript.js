function Book(bookName, authorName, pages, readStatus) {
    this.bookName = bookName
    this.authorName = authorName
    this.pages = pages
    this.readStatus = readStatus;
    this.info = function () {
    }
}

let addButton = document.querySelector('.addBook');
let form = document.querySelector('form');
let allInputs = document.querySelectorAll('input');
let isRead = false;
let processForm = false;
let myLibrary = [];

addButton.addEventListener('mousedown', () => {

    if (form.style.display === 'grid') {
        form.style.display = 'none';
        ResetForm();
    }
    else {
        form.style.display = 'grid';
    }
})

allInputs[3].addEventListener('mousedown', () => {
    isRead = true;
})

allInputs[4].addEventListener('mousedown', () => {
    isRead = false;
})


document.querySelector('.submitButton').addEventListener('mousedown', () => {
    for (i = 0; i < allInputs.length; i++) {
        if (allInputs[i].checkValidity() === true) {
            processForm = true;
        }
        else {
            processForm = false;
        }
    }

    console.log(processForm)

    if (processForm) {
        let bookName = allInputs[0].value,
            authorname = allInputs[1].value,
            pagesCount = allInputs[2].value,
            readStatus;

        if (isRead) {
            readStatus = 'Yes';
        }
        else {
            readStatus = 'No';
        }
        ResetForm();
        form.style.display = 'none';
        AddBook(bookName, authorname, pagesCount, readStatus);
    }
})


function ResetForm() {
    for (i = 0; i < allInputs.length; i++) {
        allInputs[i].value = '';
    }
    allInputs[3].checked = false;
    allInputs[4].checked = false;
}

function AddBook(name, author, pages, readStatus) {
    let newBook = new Book(name, author, pages, readStatus);
    myLibrary.push(newBook);
    CreateBook(name, author, pages, readStatus);
    processForm = false;
}




function CreateBook(name, author, pagesCount, readStatus) {

    /** Make the parent new book div */
    let newBookElement = document.createElement('div');
    newBookElement.classList.add('newBook');

    /** Make elements inside it */
    let nameBox = document.createElement('div');
    nameBox.classList.add('bookNameShowed');
    nameBox.innerHTML = name;

    let authorNameBox = document.createElement('div');
    authorNameBox.classList.add('author');
    authorNameBox.innerHTML = `-by ${author}`;

    let pages = document.createElement('div');
    pages.classList.add('pages');
    if (parseInt(pagesCount) > 1) {
        pages.innerHTML = `${pagesCount} pages`;
    }
    else {
        pages.innerHTML = `${pagesCount} page`;
    }

    let readingStatus = document.createElement('div');
    readingStatus.classList.add('isRead');
    readingStatus.innerHTML = `Read Status: ${readStatus}`;

    /** Add buttons */
    let operation = document.createElement('div');
    operation.classList.add('operation');

    let toggleRead = document.createElement('div');
    toggleRead.classList.add('toggleRead');


    toggleRead.addEventListener('mousedown', e => {
        let writtenName = e.target.parentNode.parentNode.firstChild.innerHTML;
        myLibrary.find((n, i) => {
            if (n.bookName === writtenName && n.readStatus === 'Yes') {
                myLibrary[i] = { bookName: writtenName, authorName: n.authorName, pages: n.pages, readStatus: 'No' }
                readingStatus.innerHTML = 'Read Status: No'
                return true;
            }
            else if (n.bookName === writtenName && n.readStatus === 'No') {
                myLibrary[i] = { bookName: writtenName, authorName: n.authorName, pages: n.pages, readStatus: 'Yes' }
                readingStatus.innerHTML = 'Read Status: Yes'
                return true;
            }
        })
    })

    let deleteButton = document.createElement('div');
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('mousedown', e => {
        let writtenName = e.target.parentNode.parentNode.firstChild.innerHTML;
        let index = myLibrary.findIndex(e => e.bookName === writtenName);
        myLibrary.splice(index, 1);
        newBookElement.remove();
    })


    /** Append button to operational div */
    operation.append(toggleRead, deleteButton);

    /** Append it all to parent */

    newBookElement.append(nameBox, authorNameBox, pages, readingStatus, operation);
    document.querySelector('.collection').append(newBookElement);
}



