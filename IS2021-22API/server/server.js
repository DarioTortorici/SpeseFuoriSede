//Set up require e apertura connesione DB
var Express = require("express");
var bodyParser = require("body-parser");
var app = Express();

//API's documentate con Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.1',
        info: {
            version: '1.0.0',
            title: 'SpeseFuoriSede',
            description: 'Documentazione delle API di SpeseFuoriSede',
        },
        servers: [
            {
                url: 'http://localhost:49146/',
                description: 'Local server'
            },
        ],
        tags: [
            {
                name: 'Categorie',
                name: 'Bilancio',
                name: 'Transazioni',
                name: 'Obiettivi'
            }
        ],
        paths: {
            '/categoria': {
                get: {
                    tags: ['Categorie'],
                    summary: "Ottine categorie",
                    description: 'Ottiene dal server la lista delle categorie',
                    operationId: 'getCategory',
                    responses: {
                        '200': {
                            description: 'Categorie ottenute con successo',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/categoria'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Categorie non trovate o errore nella connessione al database',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    },
                                    example: {
                                        message: 'THE CATEGORY API IS NOT WORKING!'
                                    }
                                }
                            }
                        }
                    }
                },
            },
            '/balance': {
                get: {
                    tags: ['Bilancio'],
                    description: "Ottiene dal server il bilancio dell'utente",
                    operationId: 'getBalance',
                    parameters: [
                    ],
                    responses: {
                        '200': {
                            description: 'Bilancio ottenuto con successo',
                            content: {
                                'application/json': {
                                    schema: {
                                        
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Bilancio non esistente o errore nella connessione al database',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    },
                                    example: {
                                        message: 'THE BALANCE API IS NOT WORKING!'
                                    }
                                }
                            }
                        }
                    }
                },
            },
            '/transactions': {
                get: {
                    tags: ['Transazioni'],
                    description: "Ottiene dal server la lista di tutte le entrate e le spese",
                    operationId: 'getTransactions',
                    parameters: [
                    ],
                    responses: {
                        '200': {
                            description: 'Transazioni ottenute con successo',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/entrate'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Get Transazioni non riuscita o errore nella connessione al database',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    },
                                    example: {
                                        message: 'THE TRANSACTIONS API IS NOT WORKING!'
                                    }
                                }
                            }
                        }
                    }
                },
            },
            '/entrate': {
                post: {
                    tags: ['Transazioni'],
                    description: "Manda al server una entrata",
                    parameters: {
                        "- in": "descrizione"
                    },
                    responses: {
                        '200': {
                            description: 'Entrata registrata con successo',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/entrate'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Post entrata non riuscita o errore nella connessione al database',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    },
                                }
                            }
                        }
                    }
                },
            },
            '/goals': {
                get: {
                    tags: ['Obiettivi'],
                    description: "Ottiene dal server la lista di tutti gli obiettivi",
                    operationId: 'getGoals',
                    parameters: [
                    ],
                    responses: {
                        '200': {
                            description: 'Obiettivi ottenuti con successo',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/goal'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Get Obiettivi non riuscita o errore nella connessione al database',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    },
                                    example: {
                                        message: 'THE GOALS API IS NOT WORKING!'
                                    }
                                }
                            }
                        }
                    }
                },
            },
            '/spese': {
                post: {
                    tags: ['Transazioni'],
                    description: "Manda al server una spesa",
                    responses: {
                        '200': {
                            description: 'Spesa registrata con successo',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/spese'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Post spesa non riuscita o errore nella connessione al database',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    },
                                }
                            }
                        }
                    }
                },
            },
            '/goal': {
                post: {
                    tags: ['Obiettivi'],
                    description: "Manda al server un obiettivo",
                    responses: {
                        '200': {
                            description: 'Obiettivo registrato con successo',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/goal'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Post obiettivo non riuscita o errore nella connessione al database',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    },
                                }
                            }
                        }
                    }
                },
            },
            '/delete/{transactionId}': {
                delete: {
                    tags: ['Transazioni'],
                    description: "Elimina dal server una transazione",
                    operationId: 'deleteDoc',
                    parameters: [
                        "transactionId"
                    ],
                    responses: {
                        '200': {
                            description: 'Transazione eliminata con successo',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Posts'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Delete Transazione non riuscita o errore nella connessione al database',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    },
                                }
                            }
                        },
                        '404': {
                            description: 'Transazione con questo ID non trovata',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    },
                                }
                            }
                        }
                    }
                },
            },
            '/delete/{goalId}': {
                delete: {
                    tags: ['Obiettivi'],
                    description: "Elimina dal server un obiettivo",
                    operationId: 'deleteDoc',
                    parameters: [
                        "goalId"
                    ],
                    responses: {
                        '200': {
                            description: 'Obiettivo eliminato con successo',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Posts'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Delete Obiettivo non riuscita o errore nella connessione al database',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    },
                                }
                            }
                        },
                        '404': {
                            description: 'Obiettivo con questo ID non trovato',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    },
                                }
                            }
                        }
                    }
                },
            },
            '/modify/transaction/{transactionId}/{newAmount}/{newDescription}/{newDate}/{newCategory}/{newRecurrency}': {
                put: {
                    tags: ['Transazioni'],
                    description: "Modifica dal server una transazione",
                    operationId: 'modifyTransactionDoc',
                    parameters: [
                        "transactionId"
                    ],
                    responses: {
                        '200': {
                            description: 'Transazione modificata con successo',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Posts'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Put Transazione non riuscita o errore nella connessione al database',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    },
                                }
                            }
                        },
                        '404': {
                            description: 'Transazione con questo ID non trovata',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    },
                                }
                            }
                        }
                    }
                },
            },
            '/modify/transaction/{goalId}/{newAmount}/{newDescription}/{newDate}': {
                put: {
                    tags: ['Obiettivi'],
                    description: "Modifica dal server un obiettivo",
                    operationId: 'modifyGoalDoc',
                    parameters: [
                        "goalId"
                    ],
                    responses: {
                        '200': {
                            description: 'Obiettivo modificato con successo',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Posts'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Put obiettivi non riuscita o errore nella connessione al database',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    },
                                }
                            }
                        },
                        '404': {
                            description: 'Obiettivo con questo ID non trovato',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    },
                                }
                            }
                        }
                    }
                },
            },
        },
        components: {
            schemas: {
                categoria: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: "ObjectId"
                        },
                        name: {
                            type: "string"
                        },
                    }
                },
                entrate: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: "ObjectId",
                        },
                        description: {
                            type: "string"
                        },
                        category: {
                            $ref: '#/components/schemas/categoria',
                        },
                        amount: {
                            type: 'number',
                            format: "float",
                            
                        },
                        date: {
                            type: "string",
                            format: "date"
                        },
                        recurrency: {
                            type: 'Integer',
                        }
                    }
                },
                spese: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: "ObjectId"
                        },
                        description: {
                            type: "string"
                        },
                        category: {
                            $ref: '#/components/schemas/categoria',
                        },
                        amount: {
                            type: 'number',
                            format: "float",
                        },
                        date: {
                            type: "string",
                            format: "date"
                        },
                        recurrency: {
                            type: 'Integer',
                        }
                    }
                },
                goal: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: "ObjectId"
                        },
                        description: {
                            type: "string"
                        },
                        amount: {
                           type: 'number',
                            format: "float",
                        },
                        date: {
                            type: "string",
                            format: "date"
                        }
                    }
                }
            }
        },
    },
    apis: ["index.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var MongoClient = require("mongodb").MongoClient;
const { request, response } = require("express");
var CONNECTION_STRING = "mongodb+srv://g08:g08@cluster0.bqs9j.mongodb.net/test"

var cors = require('cors');
const { ObjectId, BSONType } = require("mongodb");
const { ObjectID, default: BSON } = require("bson");
const res = require("express/lib/response");
const req = require("express/lib/request");
app.use(cors());
app.use(Express.urlencoded());
app.use(Express.json());


var DATABASE = "IS_G08";
var database;
app.listen(49146, function () {

});

MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, (error, client) => {
    database = client.db(DATABASE);
    console.log("Mongo DB Connection Successfull");
});

//API per ottenere il bilancio
app.get('/balance', (request, response) => {

    database.collection("Utenti").findOne({ "id": "1" }, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            response.send(result);
        }
    })
})

//API per ottenere le categorie
/**
 * @swagger
 * /categoria:
 *   get:
 *    tags:
 *      - Categorie
 *     summary: Ottiene categorie.
 *     description: Ottiene dal server la lista delle categorie predefinite
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                  type: string
 *                  format: MongoDB Object
 *                  description: Identificativo univoco
 *                  example: ObjectId("61a8ac85b7eebf0587e16165")
 *               Name:
 *                  type: string
 *                  description: Il nome della categoria.
 *                  example: Alimenti
 *               
 *     responses:
 *       201:
 *         description: categorie ottenute con successo
 *         content:
 *          applications/json:
 *            schema:
 *              $ref: #/components/schemas/categoria
 *       
 *       400:
 *          description: Categorie non trovate o errore nella connessione al database
 *          content:
 *          applications/json:
 *            example:
 *              message: THE CATEGORY API IS NOT WORKING!
 *              
*/
app.get('/categoria', (request, response) => {
    database.collection("Categoria").find({}).toArray((error, result) => {
        if (error) {
            console.log(error);
        } else {
            entrate = result;
            response.send(result);
        }
    })
})



//API per ottenere gli obiettivi
app.get('/goals', (request, response) => {
    database.collection("Goal").find({}).toArray((error, result) => {
        if (error) {
            console.log(error);
        } else {
            response.send(result);
        }
    })
})


//API per ottenere la lista contenente tutte le transazioni dal DB (spese ed entrate)
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

//API per ottenere una determinata transazione dal suo ID
app.get('/transaction/:id', (request, response) => {

    database.collection("Spese").findOne({ "_id": ObjectId(request.params.id) }, function (error, result) {
        if (result != null) {
            response.send(result);
        }
    })

    database.collection("Entrate").findOne({ "_id": ObjectId(request.params.id) }, function (error, result) {
        if (result != null) {
            response.send(result);
        }
    })
})

//API per ottenere un determinato obiettivo dal suo ID
app.get('/goal/:id', (request, response) => {


    database.collection("Goal").findOne({ "_id": ObjectId(request.params.id) }, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            response.send(result);
        }
    })
})


//API per inserire l'entrata nel database
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

//API per inserire l'entrata nel database
app.post('/spese', (request, response) => {

    //Ottiene il bilancio dell'utente e lo aggiorna
    database.collection("Utenti").findOne({ "id": "1" }, function (err, result) {
        var balanceValue = parseFloat(result.balance).toFixed(2);
        balanceValue -= parseFloat(request.body.speseAmount).toFixed(2);

        var temp = balanceValue.toFixed(2).toString()

        database.collection("Utenti").updateOne({ "id": "1" }, {
            $set:
            {
                balance: temp
            }
        });

        //Crea un nuovo oggetto che contiene i dati dell'entrata
        let newExpense = new Object();
        newExpense.amount = "-" + request.body.speseAmount,
            newExpense.category = request.body.transactionCategory,
            newExpense.description = request.body.speseDescription,
            newExpense.date = request.body.speseDate,
            newExpense.recurrencyDays = request.body.speseRecurrencyDays

        var newData = JSON.stringify(newExpense);
        var temp = JSON.parse(newData);

        //Aggiunge l'entrata al database
        database.collection("Spese").insertOne(temp);
        response.json();

    });
});


app.post('/goal', (request, response) => {

    let newgoal = new Object();
    newgoal.amount = request.body.goalAmount,
        newgoal.description = request.body.goalDescription,
        newgoal.date = request.body.goalDate;

    var newData = JSON.stringify(newgoal);
    var temp = JSON.parse(newData);

    //Aggiunge l'entrata al database
    database.collection("Goal").insertOne(temp);
    response.json();
});


app.delete('/delete/:id', (request, response) => {

    var transactionAmount = 0;

    //Ottiene l'importo della spesa/entrata

    database.collection("Entrate").findOne({ "_id": ObjectId(request.params.id) }, function (error, result) {
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

    database.collection("Spese").findOne({ "_id": ObjectId(request.params.id) }, function (error, result) {
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

    database.collection("Entrate").deleteOne({ "_id": ObjectId(request.params.id) });
    database.collection("Spese").deleteOne({ "_id": ObjectId(request.params.id) });
    database.collection("Goal").deleteOne({ "_id": ObjectId(request.params.id) });
    response.json();
})


// Modifica la transizione con quell'identificativo 
app.put('/modify/transaction/:id/:amount/:desc/:date/:category/:recurrency', (request, response) => {

    var amountGap;

    database.collection("Entrate").findOne({ "_id": ObjectId(request.params.id) }, function (req, res) {
        if (res != null) {
            amountGap = parseFloat(res.amount - request.params.amount).toFixed(2);

            database.collection("Entrate").updateOne({ "_id": ObjectId(request.params.id) },
                //Update
                [
                    {
                        $set:
                        {
                            amount: request.params.amount,
                            description: request.params.desc,
                            category: request.params.category,
                            date: request.params.date,
                            recurrencyDays: request.params.recurrency
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

    database.collection("Spese").findOne({ "_id": ObjectId(request.params.id) }, function (req, res) {
        if (res != null) {
            amountGap = parseFloat(res.amount - request.params.amount).toFixed(2);

            database.collection("Spese").updateOne({ "_id": ObjectId(request.params.id) },
                //Update
                [
                    {
                        $set:
                        {
                            amount: request.params.amount,
                            description: request.params.desc,
                            category: request.params.category,
                            date: request.params.date,
                            recurrencyDays: request.params.recurrency
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


app.put('/modify/goal/:id/:amount/:desc/:date', (request, response) => {


    database.collection("Goal").updateOne({ "_id": ObjectId(request.params.id) },
        //Update
        {
            $set:
            {
                amount: request.params.amount,
                description: request.params.desc,
                date: request.params.date
            }
        }
    );

    response.json("Updated Successfully");
})
