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
    removeBook(index) {
        this.books = this.books.filter((book) => this.books.indexOf(book) !== index);
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
let book1 = new Book('unknown', 'unknown', '0', true);
myLibrary.addBook(book1);


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
        read = true;
        appendBook(myLibrary.length - 1);
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
const appendBook = (index) =>{
        const book = document.createElement('div');
        const title = document.createElement('h2');
        const author = document.createElement('h2');
        const pages = document.createElement('h2');
        const readBtn = document.createElement('button');
        const removeBtn = document.createElement('button');
        book.className = `card${index} card`;
        pages.className = 'info';
        readBtn.className = `${index}`;
        author.className = 'info';
        title.className = 'info';
        removeBtn.className = `${index}`;
        removeBtn.textContent = 'remove';
        book.setAttribute('id', `card`);
        title.setAttribute('id', 'title');
        author.setAttribute('id', 'author');
        pages.setAttribute('id', 'pages');
        removeBtn.setAttribute('id', 'remove');
        title.textContent = myLibrary.getBook(index).title;
        author.textContent = `by ${myLibrary.getBook(index).author}`;
        pages.textContent = `${myLibrary.getBook(index).pages} Page`;
        if(myLibrary.getBook(index).read){
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
books.addEventListener('click', (event) => {
    if(event.target.id === 'readBtn' || event.target.id === 'nReadBtn'){
      const readBtn = event.target;
      let index = Number(readBtn.className);
      if (readBtn.id === 'readBtn') {
        readBtn.setAttribute('id', 'nReadBtn');
        readBtn.textContent = 'Not Read';
      } else {
        readBtn.setAttribute('id', 'readBtn');
        readBtn.textContent = 'Read';
      }
      if(myLibrary.getBook(index).read){
        myLibrary.getBook(index).read = false;
      } else {
        myLibrary.getBook(index).read = true;
      }
    }
});
books.addEventListener('click', (event) => {
    if(event.target.id === 'remove'){
        const remove = event.target;
        let index = remove.className;
        let card = document.querySelector(`.card${index}`);
        myLibrary.removeBook(Number(index));
        card.remove();
    }

})

window.onload = function(){
    for(let i = 0; i < myLibrary.length; i++){
        appendBook(i);
    }
};