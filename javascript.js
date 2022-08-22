let library = [];

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