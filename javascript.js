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
let isRead = false;

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

allInputs[3].addEventListener('mousedown' , () => {
    isRead = true;
})

allInputs[4].addEventListener('mousedown' , () => {
    isRead = false;
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
            readStatus;

        if(isRead){
            readStatus = 'Yes';
        }
        else{
            readStatus = 'No';
        }
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
    console.log(name,author,pages,readStatus);
}
// let bookName = prompt('Please provide a book name' , '');
// let pages = prompt('Please provide the no. of pages in the book you want to add' , '');
// let readStatus = prompt('Did you read the book yet?', '');

// let newBook = new Book(bookName,pages,readStatus);

// console.log(newBook.info());



