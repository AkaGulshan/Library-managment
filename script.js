let books = [];
let bookId = 1;

// Load books from LocalStorage on page load
window.onload = function () {
    loadBooks(); // Load books from localStorage when the page loads
};

// Load books from localStorage and display
function loadBooks() {
    const savedBooks = localStorage.getItem("books");
    if (savedBooks) {
        books = JSON.parse(savedBooks);
        bookId = books.length > 0 ? books[books.length - 1].id + 1 : 1; // Set the next available book ID
    }
    displayBooks(); // Call displayBooks to show the loaded books
}

// Save books to localStorage
function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

// Add a new book
function addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const copies = document.getElementById("copies").value;
    const releaseDate = document.getElementById("releaseDate").value;
    const bookImage = document.getElementById("bookImage").files[0];

    if (!title || !author || !copies || !releaseDate || !bookImage) {
        alert("Please fill out all fields.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        // Add the new book to the books array
        books.push({
            id: bookId++, // Increment the ID for the new book
            title,
            author,
            copies: parseInt(copies),
            releaseDate,
            image: e.target.result, // Image as base64 encoded string
        });

        saveBooks(); // Save the updated books array to localStorage
        displayBooks(); // Update the book list display
    };
    reader.readAsDataURL(bookImage); // Read the image as base64
}

// Display the list of books
function displayBooks() {
    const bookList = document.getElementById("bookList");
    if (!bookList) return;
    bookList.innerHTML = ""; // Clear the current list before displaying new books

    // Loop through each book and create a row in the table
    books.forEach((book) => {
        const row = `
            <tr>
                <td class="p-3 border border-gray-300">${book.id}</td>
                <td class="p-3 border border-gray-300">${book.title}</td>
                <td class="p-3 border border-gray-300">${book.author}</td>
                <td class="p-3 border border-gray-300">${book.copies}</td>
                <td class="p-3 border border-gray-300">${book.releaseDate}</td>
                <td class="p-3 border border-gray-300">
                    <button onclick="deleteBook(${book.id})" class="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600">Delete</button>
                </td>
            </tr>
        `;
        bookList.innerHTML += row;
    });
}

// Delete a book by ID
function deleteBook(bookIdToDelete) {
    books = books.filter((book) => book.id !== bookIdToDelete); // Remove the book from the array
    saveBooks(); // Save the updated array to localStorage
    displayBooks(); // Re-display the updated book list
}

// Search for a book by title or author
function searchBooks() {
    const query = document.getElementById("searchQuery").value.toLowerCase();
    const results = books.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query)
    );
    displaySearchResults(results); // Display the search results
}

// Display the search results
function displaySearchResults(results) {
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = ""; // Clear any previous results

    if (results.length === 0) {
        searchResults.innerHTML = "<tr><td colspan='5' class='p-3 text-center'>No books found.</td></tr>";
        return;
    }

    // Loop through each result and create a row
    results.forEach((book) => {
        const row = `
            <tr>
                <td class="p-3 border border-gray-300">${book.id}</td>
                <td class="p-3 border border-gray-300">${book.title}</td>
                <td class="p-3 border border-gray-300">${book.author}</td>
                <td class="p-3 border border-gray-300">${book.copies}</td>
                <td class="p-3 border border-gray-300">${book.releaseDate}</td>
            </tr>
        `;
        searchResults.innerHTML += row;
    });
}
