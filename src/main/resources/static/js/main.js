book_button = document.getElementById("change_books");
client_button = document.getElementById("change_clients");
buy_book_button = document.getElementById("change_buy_books");

const url = "http://localhost:8080";

Promise.all([
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
            </tr>`;
            });
            table.insertAdjacentHTML("afterbegin", table_head)
            document.getElementById("books-body").innerHTML=table_data;
        }),

    fetch(url + "/client/getAllClients")
        .then(data => data.json())
        .then(data => {
            let table_data = "";
            let table = document.getElementById("clients-table");
            let table_head = `
            <thead>
        <tr>
        <th>ID клиента</th>
        <th>Имя</th>
        <th>Город</th>
        <th>Почта</th>
        </tr>
        </thead>
        `
            data.map(value => {
                table_data += `<tr>
            <td>${value.id}</td>
            <td>${value.name}</td>
            <td>${value.city}</td>
            <td>${value.email}</td>
            </tr>`;
            });
            table.insertAdjacentHTML("afterbegin", table_head)
            document.getElementById("clients-body").innerHTML=table_data;
        }),
    fetch(url + "/purchase/getAllPurchases")
        .then(data => data.json())
        .then(data => {
            let table_data = "";
            let table = document.getElementById("purchases-table");
            let table_head = `
            <thead>
        <tr>
        <th>ID заказа</th>
        <th>ID книги</th>
        <th>ID клиента</th>
        <th>Количество экземпляров</th>
        </tr>
        </thead>
        `
            data.map(value => {
                table_data += `<tr>
            <td>${value.id}</td>
            <td>${value.bookId}</td>
            <td>${value.clientId}</td>
            <td>${value.amount}</td>
            </tr>`;
            });
            table.insertAdjacentHTML("afterbegin", table_head)
            document.getElementById("purchases-body").innerHTML=table_data;
        })
    ])

book_button.onclick = function () {
    location.href = url + '/book';
}

client_button.onclick = function (){
    location.href = url + '/client';
}
buy_book_button.onclick = function (){
    location.href = url + "/purchase";
}