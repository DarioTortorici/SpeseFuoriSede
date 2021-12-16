///////////////////////////
//      API SECTION     //
//////////////////////////

//Chiama la funzione "getBalance" per popolare la pagina HTML
document.addEventListener("DOMContentLoaded", getBalance);
const url = document.location.href;

const lastSegment = url.split("/").pop();

//Decide le get da chiedere al DB in base alla pagina in cui ci troviamo
if (lastSegment == "Entrate.html" || lastSegment == "Spese.html") {
    getCategory();
} else if (lastSegment == "index.html" || lastSegment.includes("index.html")) {
    getTransactions();
} else (lastSegment == "Obiettivi.html")
getGoals();

/* -> GET */

function getBalance() {
    //preparazione richiesta http
    var requestBalance = new XMLHttpRequest();
    requestBalance.open('GET', 'http://localhost:49146/balance', true);
    requestBalance.send();
    requestBalance.onload = function () {
        if (requestBalance.status >= 200 && requestBalance.status < 400) {

            //Prende la risposta e la inserisce nel documento HTML
            let para = document.getElementById("balance-text");
            let balanceText = document.createTextNode(JSON.parse(this.response).balance + "€");
            para.appendChild(balanceText);
        } else {
            alert(`THE BALANCE API IS NOT WORKING!`);
        }
    }

}

//prende le transazioni dal database e li sorta per data per poi mostrarli
function getTransactions() {

    //Preparazione richiesta http
    var requestSpese = new XMLHttpRequest();
    requestSpese.open('GET', 'http://localhost:49146/transactions', true);
    requestSpese.send();
    requestSpese.onload = function () {

        if (requestSpese.status >= 200 && requestSpese.status < 400) {
            //Creazione dell'array con dentro i dati
            let obj = JSON.parse(this.response);
            var arr = new Array();
            var divRiepilogo = document.getElementById("div-riepilogo-transactions");
            Object.keys(obj).forEach(function (key) {
                arr.push(obj[key]);
            });

            //Ordino i dati per data
            for (var i = 0; i < arr.length; i++) {
                var temp = arr[i];
                var date1 = new Date(temp.date);
                for (var j = i + 1; j < arr.length; j++) {
                    var date2 = new Date(arr[j].date);
                    if (date1.valueOf() - date2.valueOf() < 0) {
                        temp = arr[j];
                        arr[j] = arr[i];
                        arr[i] = temp;
                    }
                }
            }

            //Creo l'HTML e gli inserisco i dati nell'array
            for (var i = 0; i < arr.length; i++) {
                var a = document.createElement("a");
                a.setAttribute("href", "#")
                a.setAttribute("class", "list-group-item list-group-item-action");
                a.setAttribute("data-bs-toggle", "modal");
                a.setAttribute("data-bs-target", "#transactionModal");
                a.setAttribute("id", arr[i]._id);
                a.setAttribute("onclick", 'setUpTransactionModalText(this.id)');
                var h5 = document.createElement("h5");
                h5.setAttribute("id", "transaction-description" + arr[i]._id);
                h5.setAttribute("class", "mb-1");
                var div = document.createElement("div");
                div.setAttribute("class", "d-flex w-100 justify-content-between");
                var p = document.createElement("p");
                p.setAttribute("class", "mb-1");
                p.setAttribute("id", "transaction-date" + arr[i]._id);
                var medium = document.createElement("medium");
                medium.setAttribute("class", "align-middle");
                medium.setAttribute("id", "transaction-amount" + arr[i]._id);
                var small = document.createElement("small");
                small.setAttribute("id", "transaction-category" + arr[i]._id);
                div.appendChild(p);
                div.appendChild(medium);
                a.appendChild(h5);
                a.appendChild(div);
                a.appendChild(small);
                var temp = document.createTextNode(arr[i].amount + "€");
                medium.appendChild(temp);
                temp = document.createTextNode(arr[i].description);
                h5.appendChild(temp);
                temp = document.createTextNode(arr[i].category);
                small.appendChild(temp);
                temp = document.createTextNode(arr[i].date);
                p.appendChild(temp);
                divRiepilogo.appendChild(a);
            }
            //Creo il modal che appare soltanto quando clicco su una transazione
            createTransactionModal();
        } else {
            alert('THE TRANSACTIONS API IS NOT WORKING!');
        }
    }
}

//prende tutti gli obiettivi presenti nel db
function getGoals() {

    //Preparazione richiesta http
    var requestSpese = new XMLHttpRequest();
    requestSpese.open('GET', 'http://localhost:49146/goals', true);
    requestSpese.send();
    requestSpese.onload = function () {
        if (requestSpese.status >= 200 && requestSpese.status < 400) {

            //Creazione dell'array con dentro i dati
            let obj = JSON.parse(this.response);
            var arr = new Array();
            var divRiepilogo = document.getElementById("div-riepilogo-goals");
            Object.keys(obj).forEach(function (key) {
                arr.push(obj[key]);
            });

            //Ordino i dati per data
            for (var i = 0; i < arr.length; i++) {
                var temp = arr[i];
                var date1 = new Date(temp.date);
                for (var j = i + 1; j < arr.length; j++) {
                    var date2 = new Date(arr[j].date);
                    if (date1.valueOf() - date2.valueOf() < 0) {
                        temp = arr[j];
                        arr[j] = arr[i];
                        arr[i] = temp;
                    }
                }
            }

            //Creo l'HTML e gli inserisco i dati nell'array
            for (var i = 0; i < arr.length; i++) {
                var a = document.createElement("a");
                a.setAttribute("href", "#")
                a.setAttribute("class", "list-group-item list-group-item-action");
                a.setAttribute("data-bs-toggle", "modal");
                a.setAttribute("data-bs-target", "#goalModal");
                a.setAttribute("id", arr[i]._id);
                a.setAttribute("onclick", 'setUpGoalModalText(this.id)');
                var div = document.createElement("div");
                div.setAttribute("class", "d-flex w-100 justify-content-between");
                var h5 = document.createElement("h5");
                h5.setAttribute("id", "goal-description" + arr[i]._id);
                h5.setAttribute("class", "mb-1");
                var medium = document.createElement("medium");
                medium.setAttribute("class", "align-middle");
                medium.setAttribute("id", "goal-amount" + arr[i]._id);
                var small = document.createElement("small");
                small.setAttribute("id", "goal-date" + arr[i]._id);
                div.appendChild(h5);
                div.appendChild(medium);
                a.appendChild(div);
                a.appendChild(small);
                var temp = document.createTextNode(arr[i].amount + '€');
                medium.appendChild(temp);
                temp = document.createTextNode(arr[i].description);
                h5.appendChild(temp);
                temp = document.createTextNode(arr[i].date);
                small.appendChild(temp);
                divRiepilogo.appendChild(a);

            }
            //Creo il modal che appare soltanto quando clicco su un obiettivo
            createGoalModal();
        } else {
            alert('THE GOALS API IS NOT WORKING!');
        }
    }
}

//Prende le categorie dal DB
function getCategory() {
    var requestEntrate = new XMLHttpRequest();
    requestEntrate.open('GET', 'http://localhost:49146/categoria', true);
    requestEntrate.onload = function () {
        if (requestEntrate.status >= 200 && requestEntrate.status < 400) {
            let arr = JSON.parse(this.response);
            var select = document.getElementById("transactionCategory");
            arr.forEach(element => {
                var option = document.createElement('option');
                option.text = element.name;
                option.setAttribute("id", element.name);
                select.add(option);
            });
        } else {
            alert('THE CATEGORY API IS NOT WORKING!');
        }
    }
    requestEntrate.send();
}

/* -> DELETE */

//Manda la richiesta al server della delete del documento
function deleteDoc(id) {
    var requestDelete = new XMLHttpRequest();
    var lastSegmentId = id.split("/").pop();
    requestDelete.open('DELETE', 'http://localhost:49146/delete/' + lastSegmentId, true);
    requestDelete.send();

}

/* -> MODIFY */

//Manda la richiesta al server della put del documento
function modifyTransactionDoc(id) {

    var newAmount = document.getElementById("transactionAmount").value;
    var newDesc = document.getElementById("transactionDescription").value;
    var newDate = document.getElementById("transactionDate").value;
    var newCategory = document.getElementById("transactionCategory").value;
    var newRecurrency = document.getElementById("transactionRecurrencyDays").value;

    var requestModify = new XMLHttpRequest();
    var lastSegmentId = id.split("/").pop();
    requestModify.open('PUT', 'http://localhost:49146/modify/transaction/' + lastSegmentId + '/' + newAmount + '/' + newDesc + '/' + newDate + '/' + newCategory + '/' + newRecurrency, true);
    requestModify.send();
}

function modifyGoalDoc(id) {

    var newAmount = document.getElementById("transactionAmount").value;
    var newDesc = document.getElementById("transactionDescription").value;
    var newDate = document.getElementById("transactionDate").value;

    var requestModify = new XMLHttpRequest();
    var lastSegmentId = id.split("/").pop();
    requestModify.open('PUT', 'http://localhost:49146/modify/goal/' + lastSegmentId + '/' + newAmount + '/' + newDesc + '/' + newDate, true);
    requestModify.send();
}

///////////////////////////
//      HTML SECTION    //
//////////////////////////

function refreshPage() {
    var x = document.URL;
    window.location.href = x;
}

/* -> MODALS */

//Chiude il modal al click della x in alto a destra
function closeModal() {
    var formModal = document.getElementById("formModal");
    formModal.setAttribute("class", "modal fade");
    formModal.setAttribute("style", "display:none;");

    var transactionModal = document.getElementById("transactionModal");
    transactionModal.setAttribute("class", "modal fade");
    transactionModal.setAttribute("style", "display:none;");
}

function closeGoalModal() {
    var transactionModal = document.getElementById("goalModal");
    transactionModal.setAttribute("class", "modal fade");
    transactionModal.setAttribute("style", "display:none;");
}

/* -> MODALS -> TRANSACTIONS */

//Crea il modal transazione
function createTransactionModal() {

    var transactionModal = document.createElement("div");
    transactionModal.setAttribute("id", "transactionModal")
    transactionModal.setAttribute("class", "modal fade");
    transactionModal.setAttribute("tabindex", "-1");
    transactionModal.setAttribute("aria-labelledby", "transactionModalLabel");
    transactionModal.setAttribute("aria-hidden", "true");

    var modalDialog = document.createElement("div");
    modalDialog.setAttribute("class", "modal-dialog");

    var modalContent = document.createElement("div");
    modalContent.setAttribute("class", "modal-content");

    var modalHeader = document.createElement("div");
    modalHeader.setAttribute("class", "modal-header");

    var h5 = document.createElement("h5");
    h5.setAttribute("class", "modal-title")
    h5.setAttribute("id", "transactionModalLabel");

    var b = document.createElement("button");
    b.setAttribute("type", "button");
    b.setAttribute("class", "btn-close");
    b.setAttribute("data-bs-dismiss", "modal");
    b.setAttribute("aria-label", "Close");

    var modalBody = document.createElement("div");
    modalBody.setAttribute("class", "modal-body");
    modalBody.setAttribute("id", "modalB");

    var modalFooter = document.createElement("div");
    modalFooter.setAttribute("class", "modal-footer");

    var mod = document.createElement("button");
    mod.setAttribute("type", "button");
    mod.setAttribute("class", "btn btn-secondary");
    mod.setAttribute("id", "bottone-modifica");
    mod.setAttribute("name", "bottone-modifica");
    mod.setAttribute("onclick", "setUpTransactionFormModalText(this.id)");
    mod.setAttribute("data-bs-dismiss", "modal");
    mod.setAttribute("data-bs-toggle", 'modal');

    var modifica = document.createTextNode("Modifica");
    mod.appendChild(modifica);

    var el = document.createElement("button");
    el.setAttribute("type", "button");
    el.setAttribute("class", "btn btn-primary");
    el.setAttribute("id", "bottone-elimina");
    el.setAttribute("name", "bottone-elimina");
    el.setAttribute("onclick", 'deleteDoc(this.id), refreshPage()');
    el.setAttribute("data-bs-dismiss", "modal");
    var elimina = document.createTextNode("Elimina");
    el.appendChild(elimina);

    var descText = document.createTextNode("");
    h5.appendChild(descText);

    var amountText = document.createTextNode("");
    modalBody.appendChild(amountText);

    modalHeader.appendChild(h5);
    modalHeader.appendChild(b);
    modalFooter.appendChild(mod);
    modalFooter.appendChild(el);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    modalDialog.appendChild(modalContent);

    transactionModal.appendChild(modalDialog);

    document.body.appendChild(transactionModal);

    createTransactionForm();

}

//Aggiorna i campi del modal con i campi della transazione selezionata
function setUpTransactionModalText(id) {


    var desc = document.getElementById("transaction-description" + id).textContent;
    var amount = document.getElementById("transaction-amount" + id).textContent;

    var deleteBtn = document.getElementsByName("bottone-elimina");
    deleteBtn[0].setAttribute("id", "bottone-elimina/" + id);

    var modifyBtn = document.getElementsByName("bottone-modifica");
    modifyBtn[0].setAttribute("id", "bottone-modifica/" + id);

    document.getElementById("transactionModalLabel").childNodes[0].nodeValue = desc;

    document.getElementById("modalB").childNodes[0].nodeValue = amount;

}

//Crea un form per la modifica della transazione
function createTransactionForm() {

    var containerDiv = document.createElement("div");
    containerDiv.setAttribute("class", "container")

    var formDiv = document.createElement("div");
    formDiv.setAttribute("id", "formModal")
    formDiv.setAttribute("class", "modal fade");
    formDiv.setAttribute("tabindex", "-1");
    formDiv.setAttribute("aria-labelledby", "formDiv");
    formDiv.setAttribute("style", "display: none;");
    formDiv.setAttribute("aria-modal", "true");
    formDiv.setAttribute("role", "dialog");

    var modalDialogForm = document.createElement("div");
    modalDialogForm.setAttribute("class", "modal-dialog modal-fullscreen");

    var modalContentForm = document.createElement("div");
    modalContentForm.setAttribute("class", "modal-content");

    var modalHeaderForm = document.createElement("div");
    modalHeaderForm.setAttribute("class", "modal-header");

    var h5ModalTitle = document.createElement("h5");
    h5ModalTitle.setAttribute("class", "modal-title");
    h5ModalTitle.setAttribute("id", "formModalLabel");
    var h5ModalTitleText = document.createTextNode("Modifica la transazione")
    h5ModalTitle.appendChild(h5ModalTitleText);

    var closeButton = document.createElement("button");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("class", "btn-close");
    closeButton.setAttribute("data-bs-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");
    closeButton.setAttribute("onclick", "closeModal();");

    var modalBodyForm = document.createElement("div");
    modalBodyForm.setAttribute("class", "modal-body");
    modalBodyForm.setAttribute("id", "modalB");

    var form = document.createElement("form");
    form.setAttribute("onsubmit", "refreshPage()");

    var descDiv = document.createElement("div");
    descDiv.setAttribute("class", "mb-3");

    var descLabel = document.createElement("label");
    descLabel.setAttribute("class", "form-label");
    descLabel.setAttribute("for", "transactionDescription");
    var descText = document.createTextNode("Descrizione");
    descLabel.appendChild(descText);

    var descInput = document.createElement("input");
    descInput.setAttribute("class", "form-control");
    descInput.setAttribute("type", "text");
    descInput.setAttribute("placeholder", "vecchio valore");
    descInput.setAttribute("name", "transactionDescription");
    descInput.setAttribute("id", "transactionDescription");

    var categoryDiv = document.createElement("div");
    categoryDiv.setAttribute("class", "mb-3");

    var categoryLabel = document.createElement("label");
    categoryLabel.setAttribute("class", "form-label");
    categoryLabel.setAttribute("for", "transactionCategory");
    var categoryText = document.createTextNode("Categoria");
    categoryLabel.appendChild(categoryText);

    var categorySelect = document.createElement("select");
    categorySelect.setAttribute("class", "form-control");
    categorySelect.setAttribute("name", "transactionCategory");
    categorySelect.setAttribute("id", "transactionCategory");
    getCategory();

    var amountDiv = document.createElement("div");
    amountDiv.setAttribute("class", "mb-3");

    var amountLabel = document.createElement("label");
    amountLabel.setAttribute("class", "form-label");
    amountLabel.setAttribute("for", "transactionAmount");
    var amountText = document.createTextNode("Importo");
    amountLabel.appendChild(amountText);

    var amountInput = document.createElement("input");
    amountInput.setAttribute("class", "form-control");
    amountInput.setAttribute("type", "number");
    amountInput.setAttribute("step", "0.01");
    amountInput.setAttribute("placeholder", "vecchio valore");
    amountInput.setAttribute("name", "transactionAmount");
    amountInput.setAttribute("id", "transactionAmount");

    var dateDiv = document.createElement("div");
    dateDiv.setAttribute("class", "mb-3");

    var dateLabel = document.createElement("label");
    dateLabel.setAttribute("class", "form-label");
    dateLabel.setAttribute("for", "transactionDate");
    var dateText = document.createTextNode("Data");
    dateLabel.appendChild(dateText);

    var dateInput = document.createElement("input");
    dateInput.setAttribute("class", "form-control");
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("placeholder", "vecchio valore");
    dateInput.setAttribute("name", "transactionDate");
    dateInput.setAttribute("id", "transactionDate");

    var recurrencyDiv = document.createElement("div");
    recurrencyDiv.setAttribute("class", "mb-3");

    var recurrencyLabel = document.createElement("label");
    recurrencyLabel.setAttribute("class", "form-label");
    recurrencyLabel.setAttribute("for", "transactionRecurrencyDays");
    var recurrencyText = document.createTextNode("Giorni ricorrenza");
    recurrencyLabel.appendChild(recurrencyText);

    var recurrencyInput = document.createElement("input");
    recurrencyInput.setAttribute("class", "form-control");
    recurrencyInput.setAttribute("type", "number");
    recurrencyInput.setAttribute("value", "0");
    recurrencyInput.setAttribute("name", "transactionRecurrencyDays");
    recurrencyInput.setAttribute("id", "transactionRecurrencyDays");

    var modalFooterForm = document.createElement("div");
    modalFooterForm.setAttribute("class", "modal-footer");

    var formButton = document.createElement("button");
    formButton.setAttribute("class", "btn btn-primary");
    formButton.setAttribute("type", "submit");
    formButton.setAttribute("id", "bottone-form");
    formButton.setAttribute("onclick", 'modifyTransactionDoc(this.id), refreshPage();');
    var formButtonText = document.createTextNode("Submit");
    formButton.appendChild(formButtonText);

    modalFooterForm.appendChild(formButton);

    recurrencyDiv.appendChild(recurrencyLabel);
    recurrencyDiv.appendChild(recurrencyInput);

    dateDiv.appendChild(dateLabel);
    dateDiv.appendChild(dateInput);

    amountDiv.appendChild(amountLabel);
    amountDiv.appendChild(amountInput);

    categoryDiv.appendChild(categoryLabel);
    categoryDiv.appendChild(categorySelect);

    descDiv.appendChild(descLabel);
    descDiv.appendChild(descInput);

    form.appendChild(descDiv);
    form.appendChild(categoryDiv);
    form.appendChild(amountDiv);
    form.appendChild(dateDiv);
    form.appendChild(recurrencyDiv);
    form.appendChild(modalFooterForm);

    modalBodyForm.appendChild(form);

    modalHeaderForm.appendChild(h5ModalTitle);
    modalHeaderForm.appendChild(closeButton);

    modalContentForm.appendChild(modalHeaderForm);
    modalContentForm.appendChild(modalBodyForm);

    modalDialogForm.appendChild(modalContentForm);

    formDiv.appendChild(modalDialogForm);

    containerDiv.appendChild(formDiv);

    document.body.appendChild(containerDiv);
}

//Aggiorna i campi del form con i campi della transazione selezionata
function setUpTransactionFormModalText(id) {

    //get dei valori per il form modifica transazioni
    var lastSegmentId = id.split("/").pop();
    var requestDoc = new XMLHttpRequest();
    requestDoc.open('GET', 'http://localhost:49146/transaction/' + lastSegmentId, true);
    requestDoc.send();
    requestDoc.onload = function () {
        if (requestDoc.status >= 200 && requestDoc.status < 400) {
            let doc = JSON.parse(this.response);

            var amountInput = document.getElementById("transactionAmount");
            amountInput.setAttribute("value", doc.amount);

            var descInput = document.getElementById("transactionDescription");
            descInput.setAttribute("value", doc.description);

            var categoryOption = document.getElementById(doc.category);
            categoryOption.setAttribute("selected", "selected");

            var dateInput = document.getElementById("transactionDate");
            dateInput.setAttribute("value", doc.date);

            var recurrencyInput = document.getElementById("transactionRecurrencyDays")
            recurrencyInput.setAttribute("value", doc.recurrencyDays);

            var submitBtn = document.getElementById("bottone-form");
            submitBtn.setAttribute("id", "bottone-form/" + lastSegmentId);
        }
    }

    var formModal = document.getElementById("formModal");
    formModal.setAttribute("class", "modal fade show");
    formModal.setAttribute("style", "display:block;");
    formModal.setAttribute("aria-modal", "true");
    formModal.setAttribute("role", "dialog");


}

/* -> MODALS -> GOALS */

//Crea il modal obiettivo
function createGoalModal() {

    var goalModal = document.createElement("div");
    goalModal.setAttribute("id", "goalModal")
    goalModal.setAttribute("class", "modal fade");
    goalModal.setAttribute("tabindex", "-1");
    goalModal.setAttribute("aria-labelledby", "goalModalLabel");
    goalModal.setAttribute("aria-hidden", "true");

    var modalDialog = document.createElement("div");
    modalDialog.setAttribute("class", "modal-dialog");

    var modalContent = document.createElement("div");
    modalContent.setAttribute("class", "modal-content");

    var modalHeader = document.createElement("div");
    modalHeader.setAttribute("class", "modal-header");

    var h5 = document.createElement("h5");
    h5.setAttribute("class", "modal-title")
    h5.setAttribute("id", "goalModalLabel");

    var b = document.createElement("button");
    b.setAttribute("type", "button");
    b.setAttribute("class", "btn-close");
    b.setAttribute("data-bs-dismiss", "modal");
    b.setAttribute("aria-label", "Close");

    var modalBody = document.createElement("div");
    modalBody.setAttribute("class", "modal-body");
    modalBody.setAttribute("id", "modalB");

    var modalFooter = document.createElement("div");
    modalFooter.setAttribute("class", "modal-footer");

    var mod = document.createElement("button");
    mod.setAttribute("type", "button");
    mod.setAttribute("class", "btn btn-secondary");
    mod.setAttribute("id", "bottone-modifica");
    mod.setAttribute("name", "bottone-modifica");
    mod.setAttribute("onclick", "setUpGoalFormModalText(this.id);");
    mod.setAttribute("data-bs-dismiss", "modal");
    mod.setAttribute("data-bs-toggle", 'modal');

    var modifica = document.createTextNode("Modifica");
    mod.appendChild(modifica);

    var el = document.createElement("button");
    el.setAttribute("type", "button");
    el.setAttribute("class", "btn btn-primary");
    el.setAttribute("id", "bottone-elimina");
    el.setAttribute("name", "bottone-elimina");
    el.setAttribute("onclick", 'deleteDoc(this.id), refreshPage();');
    el.setAttribute("data-bs-dismiss", "modal");
    var elimina = document.createTextNode("Elimina");
    el.appendChild(elimina);

    var descText = document.createTextNode("");
    h5.appendChild(descText);

    var amountText = document.createTextNode("");
    modalBody.appendChild(amountText);

    modalHeader.appendChild(h5);
    modalHeader.appendChild(b);
    modalFooter.appendChild(mod);
    modalFooter.appendChild(el);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    modalDialog.appendChild(modalContent);

    goalModal.appendChild(modalDialog);

    document.body.appendChild(goalModal);

    createGoalForm();

}

//Aggiorna i campi del modal con i campi dell' obiettivo selezionato
function setUpGoalModalText(id) {

    var desc = document.getElementById("goal-description" + id).textContent;
    var amount = document.getElementById("goal-amount" + id).textContent;
    var deleteBtn = document.getElementsByName("bottone-elimina");
    deleteBtn[0].setAttribute("id", "bottone-elimina/" + id);

    var modifyBtn = document.getElementsByName("bottone-modifica");
    modifyBtn[0].setAttribute("id", "bottone-modifica/" + id);


    document.getElementById("goalModalLabel").childNodes[0].nodeValue = desc;

    document.getElementById("modalB").childNodes[0].nodeValue = amount;

}

//Crea un form per la modifica dell'obiettivo
function createGoalForm() {

    var containerDiv = document.createElement("div");
    containerDiv.setAttribute("class", "container")

    var formDiv = document.createElement("div");
    formDiv.setAttribute("id", "formModal")
    formDiv.setAttribute("class", "modal fade");
    formDiv.setAttribute("tabindex", "-1");
    formDiv.setAttribute("aria-labelledby", "formDiv");
    formDiv.setAttribute("style", "display: none;");
    formDiv.setAttribute("aria-modal", "true");
    formDiv.setAttribute("role", "dialog");

    var modalDialogForm = document.createElement("div");
    modalDialogForm.setAttribute("class", "modal-dialog modal-fullscreen");

    var modalContentForm = document.createElement("div");
    modalContentForm.setAttribute("class", "modal-content");

    var modalHeaderForm = document.createElement("div");
    modalHeaderForm.setAttribute("class", "modal-header");

    var h5ModalTitle = document.createElement("h5");
    h5ModalTitle.setAttribute("class", "modal-title");
    h5ModalTitle.setAttribute("id", "formModalLabel");
    var h5ModalTitleText = document.createTextNode("Modifica l'obiettivo")
    h5ModalTitle.appendChild(h5ModalTitleText);

    var closeButton = document.createElement("button");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("class", "btn-close");
    closeButton.setAttribute("data-bs-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");
    closeButton.setAttribute("onclick", "closeModal();");

    var modalBodyForm = document.createElement("div");
    modalBodyForm.setAttribute("class", "modal-body");
    modalBodyForm.setAttribute("id", "modalB");

    var form = document.createElement("form");
    form.setAttribute("onsubmit", "refreshPage()");

    var descDiv = document.createElement("div");
    descDiv.setAttribute("class", "mb-3");

    var descLabel = document.createElement("label");
    descLabel.setAttribute("class", "form-label");
    descLabel.setAttribute("for", "transactionDescription");
    var descText = document.createTextNode("Descrizione");
    descLabel.appendChild(descText);

    var descInput = document.createElement("input");
    descInput.setAttribute("class", "form-control");
    descInput.setAttribute("type", "text");
    descInput.setAttribute("placeholder", "vecchio valore");
    descInput.setAttribute("name", "transactionDescription");
    descInput.setAttribute("id", "transactionDescription");

    var amountDiv = document.createElement("div");
    amountDiv.setAttribute("class", "mb-3");

    var amountLabel = document.createElement("label");
    amountLabel.setAttribute("class", "form-label");
    amountLabel.setAttribute("for", "transactionAmount");
    var amountText = document.createTextNode("Importo");
    amountLabel.appendChild(amountText);

    var amountInput = document.createElement("input");
    amountInput.setAttribute("class", "form-control");
    amountInput.setAttribute("type", "number");
    amountInput.setAttribute("step", "0.01");
    amountInput.setAttribute("placeholder", "vecchio valore");
    amountInput.setAttribute("name", "transactionAmount");
    amountInput.setAttribute("id", "transactionAmount");

    var dateDiv = document.createElement("div");
    dateDiv.setAttribute("class", "mb-3");

    var dateLabel = document.createElement("label");
    dateLabel.setAttribute("class", "form-label");
    dateLabel.setAttribute("for", "transactionDate");
    var dateText = document.createTextNode("Data");
    dateLabel.appendChild(dateText);

    var dateInput = document.createElement("input");
    dateInput.setAttribute("class", "form-control");
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("placeholder", "vecchio valore");
    dateInput.setAttribute("name", "transactionDate");
    dateInput.setAttribute("id", "transactionDate");

    var modalFooterForm = document.createElement("div");
    modalFooterForm.setAttribute("class", "modal-footer");

    var formButton = document.createElement("button");
    formButton.setAttribute("class", "btn btn-primary");
    formButton.setAttribute("type", "submit");
    formButton.setAttribute("id", "bottone-form");
    formButton.setAttribute("onclick", 'modifyGoalDoc(this.id), refreshPage();');
    var formButtonText = document.createTextNode("Submit");
    formButton.appendChild(formButtonText);

    modalFooterForm.appendChild(formButton);

    dateDiv.appendChild(dateLabel);
    dateDiv.appendChild(dateInput);

    amountDiv.appendChild(amountLabel);
    amountDiv.appendChild(amountInput);

    descDiv.appendChild(descLabel);
    descDiv.appendChild(descInput);

    form.appendChild(descDiv);
    form.appendChild(amountDiv);
    form.appendChild(dateDiv);
    form.appendChild(modalFooterForm);

    modalBodyForm.appendChild(form);

    modalHeaderForm.appendChild(h5ModalTitle);
    modalHeaderForm.appendChild(closeButton);

    modalContentForm.appendChild(modalHeaderForm);
    modalContentForm.appendChild(modalBodyForm);

    modalDialogForm.appendChild(modalContentForm);

    formDiv.appendChild(modalDialogForm);

    containerDiv.appendChild(formDiv);

    document.body.appendChild(containerDiv);
}

//Aggiorna i campi del form con i campi dell'obiettivo selezionato
function setUpGoalFormModalText(id) {

    //get dei valori per il form modifica obiettivi
    var lastSegmentId = id.split("/").pop();
    var requestDoc = new XMLHttpRequest();
    requestDoc.open('GET', 'http://localhost:49146/goal/' + lastSegmentId, true);
    requestDoc.send();
    requestDoc.onload = function () {
        if (requestDoc.status >= 200 && requestDoc.status < 400) {
            let doc = JSON.parse(this.response);

            var amountInput = document.getElementById("transactionAmount");
            amountInput.setAttribute("value", doc.amount);

            var descInput = document.getElementById("transactionDescription");
            descInput.setAttribute("value", doc.description);

            var dateInput = document.getElementById("transactionDate");
            dateInput.setAttribute("value", doc.date);

            var submitBtn = document.getElementById("bottone-form");
            submitBtn.setAttribute("id", "bottone-form/" + lastSegmentId);

        }
    }

    var formModal = document.getElementById("formModal");
    formModal.setAttribute("class", "modal fade show");
    formModal.setAttribute("style", "display:block;");
    formModal.setAttribute("aria-modal", "true");
    formModal.setAttribute("role", "dialog");
}
