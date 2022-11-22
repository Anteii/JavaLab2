const button = document.getElementById("addPurchase");
const returnButton = document.getElementById("returnOnMainPage");

const url = "http://localhost:8080";

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
        <th>Удаление</th>
        <th>Изменение</th>
        </tr>
        </thead>
        `
        data.map(value => {
            table_data += `<tr>
            <td>${value.id}</td>
            <td>${value.bookId}</td>
            <td>${value.clientId}</td>
            <td>${value.amount}</td>
            <td> <a id="delete${value.id}" onclick="window.delete_purchase(${value.id})"> Удалить заказ </a></td>
            <td> <a id="update${value.id}" onclick="window.update_buy_book(${value.id}, ${value.bookId},
                                                                              ${value.clientId}, ${value.amount})"> Изменить заказ </td>
            </tr>`;
        });
        table.insertAdjacentHTML("afterbegin", table_head)
        document.getElementById("purchases-body").innerHTML=table_data;
    })

function update_buy_book(id, bookId, clientId, amount){
    localStorage.setItem("action", "update");
    localStorage.setItem("id", id);
    localStorage.setItem("bookId", bookId);
    localStorage.setItem("clientId", clientId);
    localStorage.setItem("amount", amount);
    location.href = url + "/purchase/edit";
}

async function delete_purchase(id) {
    fetch(url + "/purchase/delete", {
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
        else throw new Error('Can\'t delete purchase');
    }).catch(reason => alert(reason));
}

button.onclick = function () {
    localStorage.setItem("action", "insert");
    location.href = url + "/purchase/edit";
}

returnButton.onclick = function (){
    location.href = url + "/main";
}