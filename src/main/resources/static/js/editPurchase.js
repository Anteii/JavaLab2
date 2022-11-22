const action = localStorage.getItem("action");
const id = localStorage.getItem("id")
const button = document.getElementById("save_change");

const url = "http://localhost:8080/purchase";

// Inputs
bookIdElement = document.getElementById("bookId");
clientIdElement = document.getElementById("clientId");
amountElement = document.getElementById("amount");

// Check how we ended up here
if (action === "update"){
    bookIdElement.value = localStorage.getItem("bookId");
    clientIdElement.value = localStorage.getItem("clientId");
    amountElement.value = localStorage.getItem("amount");
    localStorage.clear();
} else if (action === "insert"){
    localStorage.clear();
}

const createPurchase = async (bookId, clientId, amount) => {
    return fetch(url + "/create", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            bookId: bookId,
            clientId: clientId,
            amount: amount,
        })
    });
};

const updatePurchase = async (id, bookId, clientId, amount) => {
    return fetch(url + "/update", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id : id,
            bookId: bookId,
            clientId: clientId,
            amount: amount,
        })
    });
};

button.onclick = async function () {
    if (action === "update") {
        updatePurchase(id, bookIdElement.value, clientIdElement.value, amountElement.value).then(function(response){
            if(response.ok) return response => response.json();
            else throw new Error('Can\'t update purchase data');
        }).then(_ => location.href = url).catch(reason => alert(reason));
    } else {
        createPurchase(bookIdElement.value, clientIdElement.value, amountElement.value).then(function (response) {
            if (response.ok) return response => response.json();
            else throw new Error('Can\'t add new purchase');
        }).then(_ => location.href = url).catch(reason => alert(reason));
    }
};