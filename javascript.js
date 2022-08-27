let library = [];
const form = document.querySelector('form');

function Book (title, author, pages, haveRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.haveRead = haveRead
}

Book.prototype.info = function() {
  let info = `${this.title} by ${this.author}, ${this.pages} pages, ${this.haveRead}`
  return info
}

Book.prototype.readStatus = function() {
  if (this.haveRead.toLowerCase() === 'yes') {
    this.haveRead = 'no'
  }
  else this.haveRead = 'yes'

  return this.haveRead;
}

form.addEventListener('submit', addBookToLibrary);
 

function addBookToLibrary() {
  let book = new Book;
  book.title = document.getElementById('title').value;
  book.author = document.getElementById('author').value;
  book.pages = document.getElementById('pages').value;
  book.haveRead = document.querySelector("input:checked").value;
  library.push(book);
  form.reset();
  form.setAttribute('hidden', '');
  displayBook();
}

function displayBook() {

  let currentBookNumber = library.length;
  let currentBook = library[currentBookNumber - 1]

  // Add row to table
  const table = document.querySelector('tbody');
  let row = document.createElement('tr');
  row.setAttribute(`data-number`, `${currentBookNumber}`);
  table.append(row);

  // Add book data to row
  let currentRow = table.lastChild;
  for (const property in currentBook) {
    if (currentBook.hasOwnProperty(property)) {
      let data = document.createElement('td');
      data.textContent = `${currentBook[property]}`
      currentRow.append(data);
    }
  }

  // Add remove button
  let remove = document.createElement('button');
  remove.textContent = 'Remove';
  remove.classList.add('remove');
  currentRow.append(remove);

  // Add remove functionality
  remove = currentRow.lastChild;
  remove.addEventListener('click', () => 
    currentRow.remove())
}

let newBook = document.querySelector('button.new');
newBook.addEventListener('click', () => 
  form.removeAttribute('hidden'))


