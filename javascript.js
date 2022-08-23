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

  let currentBook = library.length - 1;

// Add row to table
    const table = document.querySelector('tbody');
    let row = document.createElement('tr');
    row.setAttribute(`data-number`, `${currentBook}`);
    table.append(row);

    // Add book data to row
    let currentRow = table.lastChild;
    for (const property in library[currentBook]) {
        let data = document.createElement('td');
        data.textContent = `${library[currentBook][property]}`
        currentRow.append(data);
    }
}

let button = document.querySelector('button');
button.addEventListener('click', () => 
  form.removeAttribute('hidden'))
