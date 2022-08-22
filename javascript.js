let library = [{'title':'Gulliver Boys', 'author': 'St Gulliver', 'pages': 20, 'haveRead': true}];

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

function addBookToLibrary() {

}

function displayBook() {

  // Add row to table
  for (let i = 0; i < library.length; i++) {
      const table = document.querySelector('tbody');
      let row = document.createElement('tr');
      row.setAttribute(`data-number`, `${i}`);
      table.append(row);

      // Add book data to row
      let currentRow = table.lastChild;
      for (const property in library[i]) {
          let data = document.createElement('td');
          data.textContent = `${library[i][property]}`
          currentRow.append(data);
      }
  }
}

displayBook();
