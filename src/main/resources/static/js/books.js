const button = document.getElementById("addBook");
const returnButton = document.getElementById("returnOnMainPage");

const url =  "http://localhost:8080";

fetch(url + "/book/getAllBooks")
    .then(data => data.json())
    .then(data => {
        let table_data = "";
        let table = document.getElementById("books-table");
        let table_head = `
            <thead>
        <tr>
        <th>ID книги</th>
        <th>Название</th>
        <th>Имя автора</th>
        <th>Жанр</th>
        <th>Цена</th>
        <th>Удаление</th>
        <th>Изменение</th>
        </tr>
        </thead>
        `
        data.map(value => {
            table_data += `<tr>
            <td>${value.id}</td>
            <td>${value.title}</td>
            <td>${value.authorName}</td>
            <td>${value.genre}</td>
            <td>${value.price}</td>
            <td> <a id="delete${value.id}" onclick="window.delete_book(${value.id})"> Удалить книгу </a></td>
            <td> <a id="update${value.id}" onclick="window.update_book(${value.id}, \'${value.title}\', \'${value.authorName}\',
                                                                           \'${value.genre}\', ${value.price})"> Изменить книгу </td>
            </tr>`;
        });
        table.insertAdjacentHTML("afterbegin", table_head)
        document.getElementById("books-body").innerHTML=table_data;
    })

function update_book(id, title, authorName, genre, price){
    localStorage.setItem("action", "update");
    localStorage.setItem("id", id);
    localStorage.setItem("title", title);
    localStorage.setItem("authorName", authorName);
    localStorage.setItem("genre", genre);
    localStorage.setItem("price", price);
    location.href = url + "/book/edit";
}

async function delete_book(id) {
    fetch(url + "/book/delete", {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: id
    }).then(function(response){
        if(response.ok){
            let delete_row = document.getElementById("delete" + id);
            delete_row = delete_row.closest("tr");
            delete_row.remove();
            return response => response.json();
        }
        else throw new Error('Can\'t delete book');
    }).catch(reason => alert(reason));
}

button.onclick = function () {
    localStorage.setItem("action", "insert");
    location.href = url + "/book/edit";
}

returnButton.onclick = function (){
    location.href = url + "/main";
}