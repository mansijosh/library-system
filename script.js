// Get references to DOM elements
const addBookForm = document.getElementById("addBookForm");
const bookTableBody = document.getElementById("bookTableBody");
const searchInput = document.getElementById("searchInput");
const filterGenre = document.getElementById("filterGenre");

let books = JSON.parse(localStorage.getItem("books")) || [];

// Function to display books
function displayBooks() {
    bookTableBody.innerHTML = "";

    const searchTerm = searchInput.value.toLowerCase();
    const selectedGenre = filterGenre.value;

    books
        .filter(book =>
            (book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm)) &&
            (selectedGenre === "all" || book.genre === selectedGenre)
        )
        .forEach((book, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.genre}</td>
                <td>${book.year}</td>
                <td><button onclick="deleteBook(${index})">Delete</button></td>
            `;
            bookTableBody.appendChild(row);
        });
}

// Function to add a book
addBookForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const newBook = {
        title: addBookForm.bookTitle.value,
        author: addBookForm.author.value,
        genre: addBookForm.genre.value,
        year: addBookForm.year.value
    };

    books.push(newBook);
    updateGenres();
    saveBooks();
    displayBooks();
    addBookForm.reset();
});

// Function to delete a book
function deleteBook(index) {
    books.splice(index, 1);
    saveBooks();
    displayBooks();
}

// Function to save books to local storage
function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

// Function to update genre filter
function updateGenres() {
    const genres = ["all", ...new Set(books.map(book => book.genre))];
    filterGenre.innerHTML = genres.map(genre => `<option value="${genre}">${genre}</option>`).join("");
}

// Event listeners for search and filter
searchInput.addEventListener("input", displayBooks);
filterGenre.addEventListener("change", displayBooks);

// Initial load
updateGenres();
displayBooks();
