let library = [];
const form = document.querySelector('form');

function Book (title, author, pages, haveRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.haveRead = haveRead
    this.info = function() {
      let info = `${title} by ${author}, ${pages} pages, ${haveRead}`
      return info
    }
  }

form.addEventListener('submit', addBookToLibrary);
 

function addBookToLibrary() {
  const book = Object.create(Book);
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

  let currentBook = library.length;

  // Add row to table
  const table = document.querySelector('tbody');
  let row = document.createElement('tr');
  row.setAttribute(`data-number`, `${currentBook}`);
  table.append(row);

  // Add book data to row
  let currentRow = table.lastChild;
  for (const property in library[currentBook - 1]) {
      let data = document.createElement('td');
      data.textContent = `${library[currentBook - 1][property]}`
      currentRow.append(data);
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


