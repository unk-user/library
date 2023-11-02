class Book {
    constructor(
        title = 'unknown',
        author = 'unknown',
        pages = '0',
        read = false
        ){
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.read = read;
        }
}
class Library {
    constructor(){
        this.books = [];
    }
    addBook(newBook) {
        if(!this.inLibrary(newBook)){
            this.books.push(newBook);
        }
    }
    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title);
    }
    getBook(index){
        return this.books[index];
    }
    inLibrary(newBook){
        return this.books.some((book) => book.title === newBook.title);
    }
    get length() {
        return this.books.length;
    }
}
const myLibrary = new Library();


//UI 
const openModal = document.querySelector('#newBook');
const modal = document.querySelector('#modal');
openModal.addEventListener(('click'), () => {
    modal.showModal();
})
const newTitle = document.querySelector('#newtitle');
const newAuthor = document.querySelector('#newauthor');
const newPages = document.querySelector('#newpages');
const newRead = document.querySelector('.newread');
const dialogInput = document.querySelectorAll('.dialoginput');
const saveNewBook = document.querySelector('#save');
let read = true;

save.addEventListener(('click'), () => {
    if(!Array.from(dialogInput).some(input => input.value === '')){
        const newBook = new Book(newTitle.value, newAuthor.value, newPages.value, read);
        myLibrary.addBook(newBook);
        modal.close();
        newTitle.value = '';
        newAuthor.value = '';
        newPages.value = '';
        read = false;
        appendBooks(newTitle.value);
    }
});
newRead.addEventListener('click', () => {
    if(!read){
        read = true;
        newRead.setAttribute('id', 'readBtn');
        newRead.textContent = 'Read';
    } else {
        read = false;
        newRead.setAttribute('id', 'nReadBtn');
        newRead.textContent = 'not Read'
    }
    return read;
})
const books = document.querySelector('#books');
let removeBtns = [];
const appendBooks = () =>{
    for(let i = 0; i < myLibrary.length; i++){
        const book = document.createElement('div');
        const title = document.createElement('h2');
        const author = document.createElement('h2');
        const pages = document.createElement('h2');
        const readBtn = document.createElement('button');
        const removeBtn = document.createElement('button');
        book.className = `card${i} card`;
        pages.className = 'info';
        readBtn.className = `${i}`;
        author.className = 'info';
        title.className = 'info';
        removeBtn.className = `${i}`;
        removeBtn.textContent = 'remove';
        book.setAttribute('id', `card`);
        title.setAttribute('id', 'title');
        author.setAttribute('id', 'author');
        pages.setAttribute('id', 'pages');
        removeBtn.setAttribute('id', 'remove');
        title.textContent = myLibrary.getBook(i).title;
        author.textContent = `by ${myLibrary.getBook(i).author}`;
        pages.textContent = `${myLibrary.getBook(i).pages} Page`;
        if(myLibrary.getBook(i).read){
            readBtn.setAttribute('id', 'readBtn');
            readBtn.textContent = '';
            readBtn.textContent = 'Read';
        } else {
            readBtn.setAttribute('id', 'nReadBtn');
            readBtn.textContent = '';
            readBtn.textContent = 'Not Read';
        }
        
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(readBtn);
    book.appendChild(removeBtn);
    books.appendChild(book);
    removeBtns.push(removeBtn);    
    }
} 