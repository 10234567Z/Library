function Book(bookName,pages,readStatus){
    this.bookName = bookName
    this.pages = pages
    this.readStatus = readStatus
    this.info = function(){
        return `${bookName},${pages} pages,${readStatus}`
    }
}


// let bookName = prompt('Please provide a book name' , '');
// let pages = prompt('Please provide the no. of pages in the book you want to add' , '');
// let readStatus = prompt('Did you read the book yet?', '');

// let newBook = new Book(bookName,pages,readStatus);

// console.log(newBook.info());