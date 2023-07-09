class Book {
    constructor(bookName, authorName, pages, readStatus) {
        this.bookName = bookName
        this.authorName = authorName
        this.pages = pages
        this.readStatus = readStatus;
    }
}
let addButton = document.querySelector('.addBook');
let form = document.querySelector('form');
let allInputs = document.querySelectorAll('.textInput');
let radioButtons = document.getElementsByName("readStatus")
let isRead;
let processForm = false;
let myLibrary = [];
let bookColor = "#8EA482"

class AddBook extends Book {
    constructor(Bname, author, pages, readStatus) {
        super(Bname, author, pages, readStatus)
        this.Bname = Bname;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
        this.newBook = new Book(this.Bname,this.author,this.pages,this.readStatus);
        CreateBook(this.Bname, this.author, this.pagesCount, this.readStatus, this.newBook);
    }
    processForm = false;
}

addButton.addEventListener('mousedown', () => {
    if (form.style.display === 'grid') {
        form.style.display = 'none';
        ResetForm();
    }
    else {
        form.style.display = 'grid';
    }
})

radioButtons[0].addEventListener('mousedown', () => {
    isRead = true;
})

radioButtons[1].addEventListener('mousedown', () => {
    isRead = false;
})


document.querySelector('.submitButton').addEventListener('mousedown', (e) => {
    for (i = 0; i < allInputs.length; i++) {
        if (document.getElementsByTagName('input')[i].checkValidity() && (isRead === false || isRead === true) && parseInt(document.getElementsByTagName('input')[2].value) > 9) {
            processForm = true;
        }
        else {
            document.getElementsByTagName('input')[2].validity = false;
            processForm = false;
        }
    }

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
        new AddBook(bookName, authorname, pagesCount, readStatus);
    }
    else {
        return false;
    }
    e.preventDefault();
})


function ResetForm() {
    for (i = 0; i < allInputs.length; i++) {
        allInputs[i].value = '';
    }
    radioButtons[0].checked = false;
    radioButtons[1].checked = false;
}

function CreateBook(name, author, pagesCount, readStatus, newBook) {
    myLibrary.push(newBook);
    /** Make the parent new book div */
    let newBookElement = document.createElement('div');
    newBookElement.classList.add('newBook');

    newBookElement.addEventListener('click', (e) => {
        form.style.display = 'none';
    })

    RandomColor();

    newBookElement.style.backgroundColor = bookColor;

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

function RandomColor() {
    let lightLetters = "BCDEF".split('');
    let color = '#'

    for (i = 0; i < 6; i++) {
        color += lightLetters[Math.floor(Math.random() * lightLetters.length)];
    }

    bookColor = color;
}



