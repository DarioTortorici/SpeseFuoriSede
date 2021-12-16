# IS_SpeseFuoriSede
 Progetto di ingegneria del software 2021/22

## Descrizione
Progetto per Ingegneria del Software 21/22 - Un applicazione per tracciare i propri movimenti finanziari.

## Utilizzo App
### Server
Per avviare l'applicazione basta recarsi nella cartella "IS2021-22API" ed avviare il server con il comando npm start.
```
cd \SpeseFuoriSede\IS2021-22API
npm start
```
### Client
Per usufruire lato client dell'app basta semplicemente aprire la pagina **index.html** con il proprio browser preferito.

## Funzionalità
L'applicativo permette di tenere traccia delle proprie transazioni (entrate e spese) e quindi del proprio bilancio finanziario. Inoltre permette la creazione di obiettivi e come una qualsiasi transazione la possibilità di modificarlo o eliminarlo.

## API's
Ogni tipo di API è stata sviluppata per più scopi, ma per questioni di ripetitività verrà solo mostrato l'esempio delle transazioni, poiché il più completo e corposo.

### GET
Fa richiesta al database di tutte le transazioni (entrate e spese), li ordina in ordine di data e crea dinamicamente una lista in HTML.

#### Lato Client
```javascript
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
            alert('THE API IS NOT WORKING!');
        }
    }
}
```
#### Lato Server
```javascript
app.get('/transactions', (request, response) => {

    //Prende i dati dal db e li mette in myObj
    var myObj = {};
    var entrate = database.collection("Entrate").find({}).toArray();
    entrate.then(function (entrateArr) {
        var spese = database.collection("Spese").find({}).toArray();
        spese.then(function (speseArr) {
            entrateArr = entrateArr.concat(speseArr);
            Object.assign(myObj, entrateArr);
            response.json(myObj);
        });
    });
})
```

### POST
La post è diversa per entrate e spese (entrate nell'esempio sotto) ed è direttamente implementata nel form HTML

#### Lato Client
```HTML
<div class="container">
    <iframe name="dummyframe" id="dummyframe" style="display: none;"></iframe>
    <form method="post" action="http://localhost:49146/entrate" target="dummyframe" onsubmit="refreshPage()">
      <div class="mb-3">
        <label for="entrateDescription" class="form-label">Descrizione</label>
        <input required type="text" placeholder="Inserisci una descrizione dell'entrata" class="form-control"
          name="entrateDescription" id="entrateDescription">
      </div>
      <div class="mb-3">
        <label for="transactionCategory" class="form-label"> Categoria</label>
        <select class="form-control" name="transactionCategory" id="transactionCategory">
        </select>
      </div>
      <div class="mb-3">
        <label for="entrateAmount" class="form-label">Importo</label>
        <input required type="number" step=0.01 placeholder="Inserisci un'importo" class="form-control"
          name="entrateAmount" id="entrateAmount">
      </div>
      <div class="mb-3">
        <label for="entrateDate" class="form-label">Data</label>
        <input required type="date" placeholder="Inserisci una data" name="entrateDate" class="form-control"
          id="entrateDate">
      </div>
      <div class="mb-3">
        <label for="entrateRecurrencyDays" class="form-label">Giorni ricorrenza</label>
        <input type="number" value="0" class="form-control" name="entrateRecurrencyDays" id="entrateRecurrencyDays">
      </div>
      <button type="submit" id="bottone" class="btn btn-primary" onclick="reload(500)">Submit</button>
    </form>
  </div>
```

#### Lato Server
```javascript
app.post('/entrate', (request, response) => {

    //Ottiene il bilancio dell'utente e lo aggiorna
    database.collection("Utenti").findOne({ "id": "1" }, function (err, result) {
        var balanceValue = parseFloat(result.balance);
        balanceValue += parseFloat(request.body.entrateAmount);

        var temp = balanceValue.toFixed(2).toString()

        database.collection("Utenti").updateOne({ "id": "1" }, {
            $set:
            {
                balance: temp
            }
        });

        //Crea un nuovo oggetto che contiene i dati dell'entrata
        let newIncome = new Object();
        newIncome.amount = request.body.entrateAmount,
            newIncome.category = request.body.transactionCategory,
            newIncome.description = request.body.entrateDescription,
            newIncome.date = request.body.entrateDate,
            newIncome.recurrencyDays = request.body.entrateRecurrencyDays

        var newData = JSON.stringify(newIncome);
        var temp = JSON.parse(newData);

        //Aggiunge l'entrata al database
        database.collection("Entrate").insertOne(temp);
        response.json();
    });
})
```

### PUT

#### Lato Client
```javascript
function modifyTransactionDoc(id) {

    var newAmount = document.getElementById("transactionAmount").value;
    var newDesc = document.getElementById("transactionDescription").value;
    var newDate = document.getElementById("transactionDate").value;
    var newCategory = document.getElementById("transactionCategory").value;
    var newRecurrency = document.getElementById("transactionRecurrencyDays").value;

    var requestModify = new XMLHttpRequest();
    var lastSegmentId = id.split("/").pop();
    requestModify.open('PUT', 'http://localhost:49146/modify/transaction/:' + lastSegmentId + '/:' + newAmount + '/:' + newDesc + '/:' + newDate + '/:' + newCategory + '/:' + newRecurrency, true);
    requestModify.send();
}
```
#### Lato Server
```javascript
app.put('/modify/transaction/:id/:amount/:desc/:date/:category/:recurrency', (request, response) => {
    var realID = request.params.id.split(':').pop();
    var newAmount = request.params.amount.split(':').pop();
    var newDesc = request.params.desc.split(':').pop();
    var newDate = request.params.date.split(':').pop();
    var newCategory = request.params.category.split(':').pop();
    var newRecurrency = request.params.recurrency.split(':').pop();
    var amountGap;

    database.collection("Entrate").findOne({ "_id": ObjectId(realID) }, function (req, res) {
        if (res != null) {
            amountGap = parseFloat(res.amount - newAmount).toFixed(2);

            database.collection("Entrate").updateOne({ "_id": ObjectId(realID) },
                //Update
                [
                    {
                        $set:
                        {
                            amount: newAmount,
                            description: newDesc,
                            category: newCategory,
                            date: newDate,
                            recurrencyDays: newRecurrency
                        }
                    }

                ]
            );
            //Ottiene il bilancio dell'utente e lo aggiorna
            database.collection("Utenti").findOne({ "id": "1" }, function (err, result) {
                var balanceValue = parseFloat(result.balance).toFixed(2);
                balanceValue -= parseFloat(amountGap).toFixed(2);

                var temp = balanceValue.toFixed(2).toString()

                database.collection("Utenti").updateOne({ "id": "1" }, {
                    $set:
                    {
                        balance: temp
                    }
                });
            });
        }
    });

    database.collection("Spese").findOne({ "_id": ObjectId(realID) }, function (req, res) {
        if (res != null) {
            amountGap = parseFloat(res.amount - newAmount).toFixed(2);

            database.collection("Spese").updateOne({ "_id": ObjectId(realID) },
                //Update
                [
                    {
                        $set:
                        {
                            amount: newAmount,
                            description: newDesc,
                            category: newCategory,
                            date: newDate,
                            recurrencyDays: newRecurrency
                        }
                    }

                ]
            );

            //Ottiene il bilancio dell'utente e lo aggiorna
            database.collection("Utenti").findOne({ "id": "1" }, function (err, result) {
                var balanceValue = parseFloat(result.balance).toFixed(2);
                balanceValue -= parseFloat(amountGap).toFixed(2);

                var temp = balanceValue.toFixed(2).toString()

                database.collection("Utenti").updateOne({ "id": "1" }, {
                    $set:
                    {
                        balance: temp
                    }
                });
            });
        }
    });

    response.json("Updated Successfully");
})

```

### DELETE

#### Lato client
```javascript
function deleteDoc(id) {
    var requestDelete = new XMLHttpRequest();
    var lastSegmentId = id.split("/").pop();
    requestDelete.open('DELETE', 'http://localhost:49146/delete/:' + lastSegmentId, true);
    requestDelete.send();

}
```

#### Lato Server
```javascript
app.delete('/delete/:id', (request, response) => {

    var realID = request.params.id.split(':').pop();
    var transactionAmount = 0;

    //Ottiene l'importo della spesa/entrata

    database.collection("Entrate").findOne({ "_id": ObjectId(realID) }, function (error, result) {
        if (result != null) {
            transactionAmount = parseFloat(result.amount).toFixed(2);

            //Ottiene il bilancio dell'utente e lo aggiorna
            database.collection("Utenti").findOne({ "id": "1" }, function (err, result) {

                var balanceValue = parseFloat(result.balance).toFixed(2);
                balanceValue -= parseFloat(transactionAmount).toFixed(2);

                var temp = balanceValue.toFixed(2).toString();

                database.collection("Utenti").updateOne({ "id": "1" }, {
                    $set:
                    {
                        balance: temp
                    }
                });
            });
        }
    });

    database.collection("Spese").findOne({ "_id": ObjectId(realID) }, function (error, result) {
        if (result != null) {
            transactionAmount = parseFloat(result.amount).toFixed(2);

            //Ottiene il bilancio dell'utente e lo aggiorna
            database.collection("Utenti").findOne({ "id": "1" }, function (err, result) {


                var balanceValue = parseFloat(result.balance).toFixed(2);
                balanceValue -= parseFloat(transactionAmount).toFixed(2);

                var temp = balanceValue.toFixed(2).toString();

                database.collection("Utenti").updateOne({ "id": "1" }, {
                    $set:
                    {
                        balance: temp
                    }
                });
            });
        }
    });

    database.collection("Entrate").deleteOne({ "_id": ObjectId(realID) });
    database.collection("Spese").deleteOne({ "_id": ObjectId(realID) });
    database.collection("Goal").deleteOne({ "_id": ObjectId(realID) });
    response.json();
})
```

## Linguaggi e Tools usati per lo sviluppo
### Front-End
* HTML5 <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/>
* CSS3 <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/>
* Bootstrap 5 <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg" alt="bootstrap" width="40" height="40"/>

### Back-End
* NodeJS <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/>

### Linguaggi
* JavaScript <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/>

### Database
* MongoDB <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/>

### API testing
* Postman <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/>

## Autori
* Riccardo Deppi
* Nicola Radaelli
* Dario Tortorici