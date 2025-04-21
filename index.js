const myLibrary = [];
const container = document.querySelector(".container");
const removeButton = document.querySelector(".remove-button")


function Book(name, author, pages, read) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
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

            const bookRead = document.createElement("p");
            bookRead.textContent = book.read ? "Read" : "Not Read";
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
        }
    }
}


const dialog = document.querySelector("dialog");
const newBookBtn = document.querySelector(".new-book");
const dialogCloseBtn = document.querySelector(".close-button");

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