const myLibrary = [];
const container = document.querySelector(".container");
const removeButton = document.querySelector(".remove-button")
const dialog = document.querySelector("dialog");
const newBookBtn = document.querySelector(".new-book");
const dialogCloseBtn = document.querySelector(".close-button");
const addBook = document.querySelector(".add-book");

// function Book(name, author, pages, read) {
//     this.id = crypto.randomUUID();
//     this.name = name;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
// }

class Book {
    constructor(name, author, pages, read) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;

    }
}

function addBookToLibrary(myLibrary, name, author, pages, read) {
    const book = new Book(name, author, pages, read);
    myLibrary.push(book);
}

function addBookToContainer(myLibrary) {
    for (const book of myLibrary) {
        const element = container.querySelector(`#B${book.id}`);
        if (!element) {
            const bookCard = document.createElement("div");
            bookCard.id = `B${book.id}`;
            bookCard.classList.add("book-card");

            ["name", "author", "pages"].forEach(function (item) {
                const element = document.createElement("p");
                element.textContent = book[item];
                bookCard.appendChild(element);
            })

            const bookRead = document.createElement("button");
            bookRead.textContent = book.read ? "Read" : "Not Read";
            if (book.read) {
                bookRead.classList.toggle("read-button");
            }
            bookCard.appendChild(bookRead);

            const bookButton = document.createElement("button");
            bookButton.textContent = "Remove";
            bookButton.classList.add("remove-button")
            bookCard.appendChild(bookButton);

            container.appendChild(bookCard);

            bookButton.addEventListener("click",
                function () {
                    const index = myLibrary.findIndex(b => b.id === book.id);
                    if (index !== -1) {
                        myLibrary.splice(index, 1);
                        bookCard.remove();
                    }
                }

            )

            bookRead.addEventListener("click",
                function () {
                    if (book.read) {
                        book.read = false;
                        bookRead.textContent = "Not Read"
                        bookRead.classList.toggle("read-button");
                    }
                    else {
                        book.read = true;
                        bookRead.textContent = "Read"
                        bookRead.classList.toggle("read-button");
                    }
                }
            )
        }
    }
}




newBookBtn.addEventListener("click",
    function () {
        dialog.showModal();
    }
)

dialogCloseBtn.addEventListener("click",
    function () {
        dialog.close();
    }
)

addBook.addEventListener("click",
    function (event) {
        event.preventDefault();
        const bookName = (document.querySelector("#book-name")).value;
        document.querySelector("#book-name").value = "";
        const bookAuthor = (document.querySelector("#book-author")).value;
        document.querySelector("#book-author").value = "";
        const bookPages = (document.querySelector("#book-pages")).value;
        document.querySelector("#book-pages").value = "";
        const bookRead = (document.querySelector("#book-read")).checked;
        (document.querySelector("#book-read")).checked = false;
        addBookToLibrary(myLibrary, bookName, bookAuthor, bookPages, bookRead);
        dialog.close();
        addBookToContainer(myLibrary);
    }
)

