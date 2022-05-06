const form = document.getElementById("transactionForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    let transactionFormData = new FormData(form);
    let transactionObj = convertFormDataToTransactionObj(transactionFormData)
    saveTransactionObj(transactionObj)
    insertRowInTransactionTable(transactionObj)
    form.reset()
})

document.addEventListener("DOMContentLoaded", function(event) {
    let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"))
    transactionObjArr.forEach(
        function(arrayElement) {
            insertRowInTransactionTable(arrayElement)
        }
    )
})

function getNewTransactionId() {
    let lastTransactionId = localStorage.getItem("lastTransactionId") || "-1";
    let newTransactionId = JSON.parse(lastTransactionId) + 1;
    localStorage.setItem("lastTransactionId", JSON.stringify(newTransactionId))
    return newTransactionId;
}

function convertFormDataToTransactionObj(transactionFormData) {
    let transactionType = transactionFormData.get("transactionType")
    let transactionDescription = transactionFormData.get("transactionDescription")
    let transactionAmount = transactionFormData.get("transactionAmount")
    let transactionCategory = transactionFormData.get("transactionCategory")
    let transactionId = getNewTransactionId();
    return {
        "transactionType": transactionType,
        "transactionDescription": transactionDescription,
        "transactionAmount": transactionAmount,
        "transactionCategory": transactionCategory,
        "transactionId": transactionId
    }
}

function insertRowInTransactionTable(transactionObj) {
    let transactionTableRef = document.getElementById("transactionTable");
    let newTransactionRowRef = transactionTableRef.insertRow(-1);
    newTransactionRowRef.setAttribute("data-transaction-Id", transactionObj["transactionId"])

    let newtTypeCellRef = newTransactionRowRef.insertCell(0);
    newtTypeCellRef.textContent = transactionObj["transactionType"];

    newtTypeCellRef = newTransactionRowRef.insertCell(1);
    newtTypeCellRef.textContent = transactionObj["transactionDescription"];

    newtTypeCellRef = newTransactionRowRef.insertCell(2);
    newtTypeCellRef.textContent = transactionObj["transactionAmount"];

    newtTypeCellRef = newTransactionRowRef.insertCell(3);
    newtTypeCellRef.textContent = transactionObj["transactionCategory"];

    let newDeleteCell = newTransactionRowRef.insertCell(4);
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar"
    newDeleteCell.appendChild(deleteButton)

    deleteButton.addEventListener("click", (event) => {
        let TransactionRow = event.target.parentNode.parentNode;
        let transactionId = TransactionRow.getAttribute("data-transaction-Id");
        TransactionRow.remove();
        deleteTransactionObj(transactionId);
    })
}

//le paso como parametro el trasanctionId de la trasaccion que quiero eliminar
function deleteTransactionObj(transactionId) {
    //obtengo la transaccion de mi "base de datos" (descovierto de json a objeto)
    let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"));
    //busco la posicion que quiero eliminar
    let transactionIndexInArray = transactionObjArr.findIndex(element => element.transactionId === transactionId);
    //elimino el elemnto de esa posicion
    transactionObjArr.splice(transactionIndexInArray, 1);
    //covvierto de objeto a JSON
    let transactionArrayJSON = JSON.stringify(transactionObjArr);
    //guardo mi array de trasaccion en el local storage
    localStorage.setItem("transactionData", transactionArrayJSON);
}

function saveTransactionObj(transactionObj) {
    let myTransactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];
    myTransactionArray.push(transactionObj);
    //Convierto mi array de transaccion a json
    let transactionArrayJSON = JSON.stringify(myTransactionArray);
    //guardo mi array de trasaccion en el local storage
    localStorage.setItem("transactionData", transactionArrayJSON);
}