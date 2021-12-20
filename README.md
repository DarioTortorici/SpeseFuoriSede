# SpeseFuoriSede
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

### Test
Per avviare la fase di testing basta recarsi nella cartella "IS2021-22API" ed eseguire il test con il comando npm test.
```
cd \SpeseFuoriSede\IS2021-22API
npm test
```
⚠️ **Warning** ⚠️
A causa delle chiamate asincrone a MongoDB il risultato dei test non è consistente perché il database decide arbitrariamente quali eseguire prima. Consigliamo pertanto di testare le API con Swagger con gli appositi tasti _try it out_ . Per raggiungere la pagina di Swagger basta avviare il server e recarsi sulla documentazione swagger.
Sul proprio terminale:
```
cd \SpeseFuoriSede\IS2021-22API
npm start
```
Nel browser:
```https
  http://localhost:49146/api-docs/
```

## Funzionalità
L'applicativo permette di tenere traccia delle proprie transazioni (entrate e spese) e quindi del proprio bilancio finanziario. Inoltre permette la creazione di obiettivi e come una qualsiasi transazione la possibilità di modificarlo o eliminarlo.

## Tabella API Reference

### Get Bilancio

```https
  GET /balance
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `null` | `float` | Restituisce il bilancio|

### Get Categoria

```https
  GET /categoria
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `null` | `json` |   Restituisce le categorie di sistema|


### Get Transazioni

```https
  GET /transactions
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `null` | `json` |  Restituisce le transazioni|

### Get Transazione da id

```https
  GET /transaction/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Richiesto**. Id della transazione |

### Post entrata

```https
  POST /entrate
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Amount`      | `float` | **Richiesto**. Cifra entrata |
| `Description`      | `string` | **Richiesto**. Descrizione dell'entrata |
| `Date`      | `date` | **Richiesto**. Data della transazione |
| `Category`      | `string` | **Richiesto**. Categoria entrata |
| `Recurrency`      | `integer` | **Richiesto**. Giorni di ricorrenza per entrata periodica _Facoltativo il cambio del campo precompilato a 0_ |

### Post spesa

```https
  POST /spese
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Amount`      | `float` | **Richiesto**. Cifra spesa |
| `Description`      | `string` | **Richiesto**. Descrizione della spesa |
| `Date`      | `date` | **Richiesto**. Data della transazione |
| `Category`      | `string` | **Richiesto**. Categoria spesa |
| `Recurrency`      | `integer` | **Richiesto**. Giorni di ricorrenza per spesa periodica _Facoltativo il cambio del campo precompilato a 0_ |

### Modifica Transazione da id

```https
  PUT /modify/transactions/${id}/${newAmount}/${newDescription}/${newDate}/${newCategory}/${newRecurrency}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Richiesto**. Id della transazione |
| `newAmount`      | `float` | **Richiesto**. _Facoltativo il cambio del campo precompilato_ |
| `newDescription`      | `string` | **Richiesto**. _Facoltativo il cambio del campo precompilato_ |
| `newDate`      | `date` | **Richiesto**. _Facoltativo il cambio del campo precompilato_ |
| `newCategory`      | `string` | **Richiesto**. _Facoltativo il cambio del campo precompilato_ |
| `newRecurrency`      | `integer` | **Richiesto**. _Facoltativo il cambio del campo precompilato_ |

### Delete Transazione/Obiettivo da id

```https
  DELETE /delete/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Richiesto**. Id della transazione/obiettivo

### Get Obiettivi

```https
  GET /goals
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `null` | `json` |  Restituisce gli obiettivi|

### Get Obiettivo da id
```https
  GET /goal/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Richiesto**. Id dell'obiettivo |


### Post obiettivo

```https
  POST /goal
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Amount`      | `float` | **Richiesto**. Cifra da raggiungere |
| `Description`      | `string` | **Richiesto**. Descrizione dell'obiettivo |
| `Date`      | `date` | **Richiesto**. Data di scadenza obiettivo |

### Modifica Obiettivo da id

```https
  PUT /modify/goal/${id}/${newAmount}/${newDescription}/${newDate}/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Richiesto**. Id della transazione |
| `newAmount`      | `float` | **Richiesto**. _Facoltativo il cambio del campo precompilato_ |
| `newDescription`      | `string` | **Richiesto**. _Facoltativo il cambio del campo precompilato_ |
| `newDate`      | `date` | **Richiesto**. _Facoltativo il cambio del campo precompilato_ |

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
- [Riccardo Deppi](https://github.com/RiccardoDeppi/)
- [Nicola Radaelli](https://github.com/NickRada/)
- [Dario Tortorici](https://github.com/DarioTortorici/)
