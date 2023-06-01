function Book(bookName, pages, readStatus) {
    this.bookName = bookName
    this.pages = pages
    this.readStatus = readStatus
    this.info = function () {
        return `${bookName},${pages} pages,${readStatus}`
    }
}

let addButton = document.querySelector('.addBook');
let form = document.querySelector('form');
let allInputs = document.querySelectorAll('input');
let processForm = [];

addButton.addEventListener('mousedown', () => {

    if (form.style.display === 'grid') {
        form.style.display = 'none';
        processForm.length = 0;
        ResetForm();
    }
    else {
        form.style.display = 'grid';
    }
})


document.querySelector('.submitButton').addEventListener('mousedown', () => {
    for (i = 0; i < allInputs.length; i++) {
        if (allInputs[i].checkValidity() === true) {
            processForm.push(true);
        }
    }
    let processBool = processForm.length >= 5 && processForm.every(e => e === processForm[0]);
    if (processBool) {

        let bookName = allInputs[0].value,
            authorname = allInputs[1].value,
            pagesCount = allInputs[2].value,
            readStatus = allInputs[3].value;

        ResetForm();
        form.style.display = 'none';
        processForm.length = 0;
        AddBook(bookName,authorname,pagesCount,readStatus);
    }
})


function ResetForm(){
    for(i = 0; i < allInputs.length; i++){
        allInputs[i].value = '';
    }
}

function AddBook(name,author,pages,readStatus) {
    
}

// let newBook = new Book(bookName,pages,readStatus);

// console.log(newBook.info());



