const myLibrary = [{title: 'Title', author: 'Author', pages: 'Pages', read: false}];
const openModal = document.querySelector('#newBook');
const modal = document.querySelector('#modal');
const addBook = document.querySelector('#save');
const newTitle = document.querySelector('#newtitle');
const newAuthor = document.querySelector('#newauthor');
const newPages = document.querySelector('#newpages');
const newRead = document.querySelector('#newread'); 
const dialogInput = document.querySelectorAll('.dialogInput');
const books = document.querySelector('#books');

let read = false;


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
let i = myLibrary.length;
function appendBooks() {
    for(i ; i < myLibrary.length; i++){
        const book = document.createElement('div');
        book.className = 'card';
        book.setAttribute('id', `${i}`)
        const title = document.createElement('h2');
        title.setAttribute('id', 'title');
        title.className = 'info';
        const author = document.createElement('h2');
        author.setAttribute('id', 'author');
        author.className = 'info';
        const pages = document.createElement('h2');
        pages.setAttribute('id', 'pages');
        pages.className = 'info';
        const readBtn = document.createElement('button');
        readBtn.setAttribute('id', 'read');
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'remove';
        removeBtn.setAttribute('id', 'remove');
        removeBtn.className = 'cardBtn';

        title.textContent = myLibrary[i].title;
        author.textContent = myLibrary[i].author;
        pages.textContent = myLibrary[i].pages;
        if(myLibrary[i].read){
            readBtn.className = 'readBtn';
            readBtn.textContent = 'Read';
        } else {
            readBtn.className = 'nReadBtn';
            readBtn.textContent = 'Not Read';
        }
        
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(readBtn);
    book.appendChild(removeBtn);
    books.appendChild(book);
    }
}


openModal.addEventListener('click', () => {
    modal.showModal();
})

newRead.addEventListener('click', () => {
    if(read){
        read = false;
        newRead.className = 'nReadBtn';
    } else {
        read = true;
        newRead.className = 'readBtn';
    }
    return read;
})

addBook.addEventListener('click', () => {
    if(!Array.from(dialogInput).some(input => input.value === "")){
        const newBook = new Book(newTitle.value, newAuthor.value, newPages.value, read);
        myLibrary.push(newBook);
        modal.close();
        newTitle.value = '';
        newAuthor.value = '';
        newPages.value = '';
        read = false;
        appendBooks();
    }
})

books.addEventListener('click', (event) => {
    if(event.target.id === 'read'){
      const readBtn = event.target;
      if (readBtn.className === 'readBtn') {
        readBtn.className = 'nReadBtn';
      } else {
        readBtn.className = 'readBtn';
      }
    }
})

document.onload = appendBooks();