const myLibrary = [];
const openModal = document.querySelector('#newBook');
const modal = document.querySelector('#modal');
const addBook = document.querySelector('#save');
const newTitle = document.querySelector('#newtitle');
const newAuthor = document.querySelector('#newauthor');
const newPages = document.querySelector('#newpages');
const newRead = document.querySelector('.newread'); 
const dialogInput = document.querySelectorAll('.dialogInput');
const books = document.querySelector('#books');
let removeBtns = [];

let read = true;


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
let i = 0;
function appendBooks() {
    for(i ; i <= myLibrary.length; i++){
        const book = document.createElement('div');
        book.className = `card${i} card`;
        book.setAttribute('id', `card`)
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
        readBtn.className = `${i}`;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'remove';
        removeBtn.setAttribute('id', 'remove');
        removeBtn.className = `${i}`;

        title.textContent = myLibrary[i].title;
        author.textContent = `by ${myLibrary[i].author}`;
        pages.textContent = `${myLibrary[i].pages} Page`;
        if(myLibrary[i].read){
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



openModal.addEventListener('click', () => {
    modal.showModal();
})

newRead.addEventListener('click', () => {
    if(read){
        read = false;
        newRead.setAttribute('id', 'readBtn');
        newRead.textContent = 'Read';
    } else {
        read = true;
        newRead.setAttribute('id', 'nReadBtn');
        newRead.textContent = 'not Read'
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
      if(myLibrary[index].read){
        myLibrary[index].read = false;
      } else {
        myLibrary[index].read = true;
      }
    }
});

books.addEventListener('click', (event) => {
    if(event.target.id === 'remove'){
        const remove = event.target;
        let index = remove.className;
        let card = document.querySelector(`.card${index}`);
        myLibrary.splice(index, 1);
        card.remove();
    }

})



window.onload = function() {
    appendBooks();
};