const button = document.getElementById("addClient");
const returnButton = document.getElementById("returnOnMainPage");

const url = "http://localhost:8080";

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
        <th>Изменение</th>
        <th>Удаление</th>
        </tr>
        </thead>
        `
        data.map(value => {
            table_data += `<tr>
            <td>${value.id}</td>
            <td>${value.name}</td>
            <td>${value.city}</td>
            <td>${value.email}</td>
            <td> <a id="delete${value.id}" onclick="window.delete_client(${value.id})"> Удалить клиента </a></td>
            <td> <a id="update${value.id}" onclick="window.update_client(${value.id}, \'${value.name}\', \'${value.city}\',
                                                                           \'${value.email}\')"> Изменить клиента </td>
            </tr>`;
        });
        table.insertAdjacentHTML("afterbegin", table_head)
        document.getElementById("clients-body").innerHTML=table_data;
    })

function update_client(id, name, city, email){
    localStorage.setItem("action", "update");
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("city", city);
    localStorage.setItem("email", email);
    location.href = url + "/client/edit";
}

async function delete_client(id) {
    fetch(url + "/client/delete", {
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
        else throw new Error('Can\'t delete client');
    }).catch(reason => alert(reason));
}

button.onclick = function () {
    localStorage.setItem("action", "insert");
    location.href = url + "/client/edit";
}

returnButton.onclick = function (){
    location.href = url + "/main";
}