const library = [];
const form = document.querySelector("form");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
let haveRead = "";
const radio = document.querySelector("fieldset");
const fields = [title, author, pages, radio];
const fieldError = document.querySelectorAll(".field-error");

class Book {
  constructor(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
  }

  readStatus() {
    if (this.haveRead.toLowerCase() === "yes") {
      this.haveRead = "no";
    } else this.haveRead = "yes";

    return this.haveRead;
  }
}

form.addEventListener("submit", () => {
  if (validateForm() === true) {
    addBookToLibrary();
  }
});

fields.forEach((field) => {
  field.addEventListener("input", () => {
    const index = field.dataset.number;
    fieldError[index].textContent = "";
  });
});

function addBookToLibrary() {
  // Set book properties from user form
  const book = new Book();
  book.title = title.value;
  book.author = author.value;
  book.pages = pages.value;
  book.haveRead = haveRead.value;

  // Add book to library, reset/hide form, add book to page
  library.push(book);
  form.reset();
  form.setAttribute("hidden", "");
  displayBook();
}

function validateForm() {
  haveRead = document.querySelector("input:checked");
  let valid = true;
  fields.forEach((field) => {
    if (!field.validity.valid || haveRead === null) {
      showError(field);
      valid = false;
    }
  });
  return valid;
}

function showError(field) {
  console.log(field);
  console.log(haveRead);
  const index = field.dataset.number;
  if (field.validity.valueMissing) {
    fieldError[index].textContent = `Ya gotta enter the ${field.id} ya bungus!`;
  } else if (field.validity.patternMismatch) {
    fieldError[index].textContent = "Gimme a real author you son of a bitch!";
  } else if (field.validity.rangeUnderflow) {
    fieldError[index].textContent =
      "Books have at least one single pathetic page, understand?";
  } else if (field.id === "read") {
    console.log(index);
    fieldError[index].textContent = "Well?";
  }
}

function displayBook() {
  const currentBookNumber = library.length;
  const currentBook = library[currentBookNumber - 1];

  // Add row to table
  const table = document.querySelector("tbody");
  const row = document.createElement("tr");
  row.classList.add("book");
  table.append(row);

  // Add book data to row
  const currentRow = table.lastChild;
  removeBook(currentRow);
  for (const property in currentBook) {
    if (property === "haveRead") {
      const data = document.createElement("td");
      currentRow.append(data);
      const read = document.createElement("button");
      read.textContent = `${currentBook[property]}`;
      data.append(read);
      read.addEventListener("click", () => {
        read.textContent = currentBook.readStatus();
      });
    } else if (currentBook.hasOwnProperty(property)) {
      const data = document.createElement("td");
      data.textContent = `${currentBook[property]}`;
      currentRow.append(data);
    }
  }
}

function removeBook(currentRow) {
  // Add remove button
  const data = document.createElement("td");
  currentRow.append(data);
  let remove = document.createElement("button");
  remove.textContent = "-";
  remove.classList.add("remove");
  data.append(remove);

  // Add remove functionality
  remove = currentRow.firstChild;
  remove.addEventListener("click", () => currentRow.remove());
}

const newBook = document.querySelector("button.new");
newBook.addEventListener("click", () => {
  if (form.hidden) {
    form.removeAttribute("hidden");
  } else form.setAttribute("hidden", "");
});
