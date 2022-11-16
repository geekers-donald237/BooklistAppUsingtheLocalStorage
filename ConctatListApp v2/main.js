
// Book Class : Represent a Book Object
class Book{
    constructor (title , author , isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}




// Ui class : Handle UI Tasks
class UI {

    static displayBooks(){
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }


    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = ` 
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;
        list.appendChild(row);


    }


    static deleteBooks(el){
        if (confirm("Are You Sure To Want to delete this items ?")) {
            if (el.classList.contains('delete')){
                el.parentElement.parentElement.remove();
            }
        }
    }


    static searchBook(name){
        var text = name.toLowerCase();
        var itemList = document.getElementById('book-list');
        var items =  itemList.getElementsByTagName('tr');
        //Convert to an array 
        Array.from(items).forEach(function(item){
            var itemName = item.textContent;
            if(itemName.toLowerCase().indexOf(text) != -1){
                console.log("youpi !!!");
            }else{
                item.style.display = 'none';
                console.log("je bloque");
            }
        });

      
        Array.from(items).forEach(function(item){
            if (text === ''){
                console.log('toto');
                item.style.display = '';
            }
        });




    }

    static showAlert(message,className){
        const div =  document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);

        // Vanish in 1.5 seconds
        setTimeout(() => document.querySelector('.alert').remove() , 2500);
    }



    static clearFields(){
        document.querySelector('#title').value = ' ';
        document.querySelector('#author').value =' ';
        document.querySelector('#isbn').value = ' ';

    }
}



// Store Class : Handles Storage
class Store {

    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books' , JSON.stringify(books))
    }

    static removeBook(isbn){

        const books = Store.getBooks();
        books.forEach((book , index) => {
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });

        localStorage.setItem('books' , JSON.stringify(books));
    }
}


// Event : Display Books
document.addEventListener('DOMContentLoaded' , UI.displayBooks)



// Event : Add Books
document.querySelector('#book-form').addEventListener('submit' , (e)=>
{

    // Prevent Actual submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author= document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    
    // Validate 
    if (title === '' || author === ''  || isbn === ''){
        UI.showAlert("Please fill all Fields","danger");
    }else{

        // Instatiate book
        const book = new Book(title,author,isbn);

        // Add book to UI  
        UI.addBookToList(book);

        // Add book to store
        Store.addBook(book);

        //Show success message
        UI.showAlert('Book Added' , 'success');

        // clear fields 
        UI.clearFields();
    }

    setTimeout(window.location.reload(),100000);
    
});

// Event : Remove Books
document.querySelector('#book-list').addEventListener('click' , (e) => 
{
    // Remove books From UI
    UI.deleteBooks(e.target);

    // Remove Books from Store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);    

    // Show Success message
    UI.showAlert('Book Remove' , 'success');

    // setTimeout(window.location.reload(),10000);
});


// Event : Search Books
document.getElementById('filter').addEventListener('keyup' , (e) => {
    UI.searchBook(e.target.value);
  

});

