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
                    summary: "Ottiene categorie",
                    description: 'Ottiene dal server la lista delle categorie predefinite',
                    content: {
                        'applications/json': {
                            schema: {
                                type: "object",
                                properties: {
                                    "_id": {
                                        type: "ObjectId",
                                        description: "Identificativo univoco",
                                        example: 'ObjectId("61a8ac85b7eebf0587e16165")'
                                    },
                                    "name": {
                                        type: "string",
                                        description: "Il nome della categoria",
                                        example: 'Alimenti'
                                    }
                                }
                            }
                        }
                    },
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
                    summary: "Ottiene bilancio",
                    description: "Ottiene dal server il bilancio delle transazioni dell'utente",
                    content: {
                        'applications/json': {
                            schema: {
                                type: "object",
                                properties: {
                                    "amount": {
                                        type: "number",
                                        format: "float",
                                        description: "Cifra del bilancio",
                                        example: '1036.74'
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Bilancio ottenuto con successo',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/bilancio'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Bilancio non esistente o errore nella connessione al database',
                            content: {
                                'application/json': {
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
                    summary: "Ottiene transazioni",
                    description: "Ottiene dal server la lista di tutte le transazioni, ossia entrate e spese",
                    content: {
                        'applications/json': {
                            schema: {
                                type: "object",
                                properties: {
                                    "_id": {
                                        type: "ObjectId",
                                        description: "Identificativo univoco",
                                        example: 'ObjectId("61a8ac85b7eebf0587e16165")'
                                    },
                                    "description": {
                                        type: "string",
                                        description: "La descrizione della transazione",
                                        example: 'Spesa alla Coop'
                                    },
                                    "category": {
                                        $ref: '#/components/schemas/categorie',
                                        example: "Alimenti"
                                    },
                                    "amount": {
                                        type: "number",
                                        format: "float",
                                        description: "Cifra del bilancio",
                                        example: '54.32'
                                    },
                                    "date": {
                                        type: "string",
                                        format: "date",
                                        description: "La data della transazione",
                                        example: '2021-8-22'
                                    },
                                    "recurrency": {
                                        type: "integer",
                                        description: "Giorni dalla ricorrenza",
                                        example: '0'
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Transazioni ottenute con successo',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/transazioni'
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
            '/goals': {
                get: {
                    tags: ['Obiettivi'],
                    summary: "Ottiene obiettivi",
                    description: "Ottiene dal server la lista di tutti gli obiettivi",
                    content: {
                        'applications/json': {
                            schema: {
                                type: "object",
                                properties: {
                                    "_id": {
                                        type: "ObjectId",
                                        description: "Identificativo univoco",
                                        example: 'ObjectId("61a8ac85b7eebf0587e16165")'
                                    },
                                    "amount": {
                                        type: "number",
                                        format: "float",
                                        description: "Cifra dell'obiettivo",
                                        example: '197500'
                                    },
                                    "description": {
                                        type: "string",
                                        description: "La descrizione dell'obiettivo",
                                        example: 'Spesa alla Coop'
                                    },
                                    "date": {
                                        type: "string",
                                        format: "date",
                                        description: "La data di scadenza dell'obiettivo",
                                        example: '2021-03-21'
                                    },

                                }
                            }
                        }
                    },
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
                                    example: {
                                        message: 'THE GOALS API IS NOT WORKING!'
                                    }
                                }
                            }
                        }
                    }
                },
            },
            '/transaction/{transactionId}': {
                get: {
                    tags: ['Transazioni'],
                    summary: "Ritorna transazione",
                    description: "Manda al server una richiesta di get della transazione con quel identificativo",
                    parameters: [
                        {
                            "name": "transactionId",
                            "in": "path",
                            "required": true,
                            "schema": { "type": "string" },
                            "example": "61b79bfff0d6c37a84892105"
                        }
                    ],
                    content: {
                        'applications/json': {
                            schema: {
                                type: "object",
                                properties: {
                                    "_id": {
                                        type: "ObjectId",
                                        description: "Identificativo univoco",
                                        example: 'ObjectId("61b79bfff0d6c37a84892105")'
                                    },
                                    "description": {
                                        type: "string",
                                        description: "La descrizione della transazione",
                                        example: 'Bucato'
                                    },
                                    "category": {
                                        $ref: '#/components/schemas/categorie',
                                        example: "Lavanderia"
                                    },
                                    "amount": {
                                        type: "number",
                                        format: "float",
                                        description: "L'ammontare della transazione",
                                        example: '4.45'
                                    },
                                    "date": {
                                        type: "string",
                                        format: "date",
                                        description: "La data della transazione",
                                        example: '2021-08-22'
                                    },
                                    "recurrency": {
                                        type: "integer",
                                        description: "Giorni dalla ricorrenza",
                                        example: '0'
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Transazione ritornata con successo',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/transazioni'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Get Transazione non riuscita o errore nella connessione al database',
                        },
                        '404': {
                            description: 'Transazione con questo ID non trovata',
                        }
                    }
                },
            },
            '/goal/{goalId}': {
                get: {
                    tags: ['Obiettivi'],
                    summary: "Ritorna un obiettivo",
                    description: "Manda al server una richiesta di get dell'obiettivo con quel identificativo ",
                    parameters: [
                        {
                            "name": "goalId",
                            "in": "path",
                            "required": true,
                            "schema": { "type": "string" },
                            "example": "61b660933b7ecc2de476ab2e"
                        }
                    ],
                    content: {
                        'applications/json': {
                            schema: {
                                type: "object",
                                properties: {
                                    "_id": {
                                        type: "ObjectId",
                                        description: "Identificativo univoco",
                                        example: 'ObjectId("61b660933b7ecc2de476ab2e")'
                                    },
                                    "description": {
                                        type: "string",
                                        description: "La descrizione dell'obiettivo",
                                        example: 'Lamborghini Huracan'
                                    },
                                    "amount": {
                                        type: "number",
                                        format: "float",
                                        description: "L'ammontare della somma per il raggiungimento dell'obiettivo.",
                                        example: '235235.45'
                                    },
                                    "date": {
                                        type: "string",
                                        format: "date",
                                        description: "La data di scadenza dell'obiettivo",
                                        example: '2021-8-22'
                                    },

                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Obiettivo ritornato con successo',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/goal'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Get Obiettivo non riuscita o errore nella connessione al database',
                        },
                        '404': {
                            description: 'Obiettivo con questo ID non trovato'
                        }
                    }
                },
            },
            '/entrate': {
                post: {
                    tags: ['Transazioni'],
                    summary: "Registra un'entrata",
                    description: "Manda al server una entrata",
                    content: {
                        'applications/json': {
                            schema: {
                                type: "object",
                                properties: {
                                    "_id": {
                                        type: "ObjectId",
                                        description: "Identificativo univoco",
                                        example: 'ObjectId("61a8ac85b7eebf0587e16165")'
                                    },
                                    "description": {
                                        type: "string",
                                        description: "La descrizione dell'entrata",
                                        example: 'Stipendio'
                                    },
                                    "category": {
                                        $ref: '#/components/schemas/categorie',
                                        example: "Extra"
                                    },
                                    "amount": {
                                        type: "number",
                                        format: "float",
                                        description: "L'ammontare della transazione",
                                        example: '1235.45'
                                    },
                                    "date": {
                                        type: "string",
                                        format: "date",
                                        description: "La data della transazione",
                                        example: '2021-08-22'
                                    },
                                    "recurrency": {
                                        type: "integer",
                                        description: "Giorni dalla ricorrenza",
                                        example: '0'
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Entrata registrata con successo',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/transazioni'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Post entrata non riuscita o errore nella connessione al database',
                        }
                    }
                },
            },
            '/spese': {
                post: {
                    tags: ['Transazioni'],
                    summary: "Registra una spesa",
                    description: "Manda al server una spesa",
                    content: {
                        'applications/json': {
                            schema: {
                                type: "object",
                                properties: {
                                    "_id": {
                                        type: "ObjectId",
                                        description: "Identificativo univoco",
                                        example: 'ObjectId("61a8ac85b7eebf0587e16165")'
                                    },
                                    "description": {
                                        type: "string",
                                        description: "La descrizione della spesa",
                                        example: 'Bucato'
                                    },
                                    "category": {
                                        $ref: '#/components/schemas/categorie',
                                        example: "Lavanderia"
                                    },
                                    "amount": {
                                        type: "number",
                                        format: "float",
                                        description: "L'ammontare della transazione",
                                        example: '4.45'
                                    },
                                    "date": {
                                        type: "string",
                                        format: "date",
                                        description: "La data della transazione",
                                        example: '2021-08-22'
                                    },
                                    "recurrency": {
                                        type: "integer",
                                        description: "Giorni dalla ricorrenza",
                                        example: '0'
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Spesa registrata con successo',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/transazioni'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Post spesa non riuscita o errore nella connessione al database',
                        }
                    }
                },
            },
            '/goal': {
                post: {
                    tags: ['Obiettivi'],
                    summary: "Registra un obiettivo.",
                    description: "Manda al server un obiettivo",
                    content: {
                        'applications/json': {
                            schema: {
                                type: "object",
                                properties: {
                                    "_id": {
                                        type: "ObjectId",
                                        description: "Identificativo univoco",
                                        example: 'ObjectId("61a8ac85b7eebf0587e16165")'
                                    },
                                    "description": {
                                        type: "string",
                                        description: "La descrizione dell'obiettivo",
                                        example: 'Lamborghini'
                                    },
                                    "amount": {
                                        type: "number",
                                        format: "float",
                                        description: "L'ammontare della somma per il raggiungimento dell'obiettivo.",
                                        example: '235235.45'
                                    },
                                    "date": {
                                        type: "string",
                                        format: "date",
                                        description: "La data di scadenza dell'obiettivo",
                                        example: '2021-08-22'
                                    },

                                }
                            }
                        }
                    },
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
                        }
                    }
                },
            },
            '/delete/{transactionId}': {
                delete: {
                    tags: ['Transazioni'],
                    summary: "Elimina una spesa",
                    description: "Manda al server una richiesta di eliminazione della transazione con quel identificativo",
                    parameters: [
                        {
                            "name": "transactionId",
                            "in": "path",
                            "required": true,
                            "schema": { "type": "string" },
                            "example": "61b79bfff0d6c37a84892105"
                        }
                    ],
                    content: {
                        'applications/json': {
                            schema: {
                                type: "object",
                                properties: {
                                    "_id": {
                                        type: "ObjectId",
                                        description: "Identificativo univoco",
                                        example: 'ObjectId("61a8ac85b7eebf0587e16165")'
                                    },
                                    "description": {
                                        type: "string",
                                        description: "La descrizione della transazione",
                                        example: 'Bucato'
                                    },
                                    "category": {
                                        $ref: '#/components/schemas/categorie',
                                        example: "Lavanderia"
                                    },
                                    "amount": {
                                        type: "number",
                                        format: "float",
                                        description: "L'ammontare della transazione",
                                        example: '4.45'
                                    },
                                    "date": {
                                        type: "string",
                                        format: "date",
                                        description: "La data della transazione",
                                        example: '2021-8-22'
                                    },
                                    "recurrency": {
                                        type: "integer",
                                        description: "Giorni dalla ricorrenza",
                                        example: '0'
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Transazione eliminata con successo',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/transazioni'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Delete Transazione non riuscita o errore nella connessione al database',
                        },
                        '404': {
                            description: 'Transazione con questo ID non trovata',
                        }
                    }
                },
            },
            '/delete/{goalId}': {
                delete: {
                    tags: ['Obiettivi'],
                    summary: "Elimina un obiettivo",
                    description: "Manda al server una richiesta di eliminazione dell'obiettivo con quel identificativo ",
                    parameters: [
                        {
                            "name": "goalId",
                            "in": "path",
                            "required": true,
                            "schema": { "type": "string" },
                            "example": "61b660933b7ecc2de476ab2e"
                        }
                    ],
                    content: {
                        'applications/json': {
                            schema: {
                                type: "object",
                                properties: {
                                    "_id": {
                                        type: "ObjectId",
                                        description: "Identificativo univoco",
                                        example: 'ObjectId("61a8ac85b7eebf0587e16165")'
                                    },
                                    "description": {
                                        type: "string",
                                        description: "La descrizione dell'obiettivo",
                                        example: 'Lamborghini'
                                    },
                                    "amount": {
                                        type: "number",
                                        format: "float",
                                        description: "L'ammontare della somma per il raggiungimento dell'obiettivo.",
                                        example: '235235.45'
                                    },
                                    "date": {
                                        type: "string",
                                        format: "date",
                                        description: "La data di scadenza dell'obiettivo",
                                        example: '2021-8-22'
                                    },

                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Obiettivo eliminato con successo',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/goal'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Delete Obiettivo non riuscita o errore nella connessione al database',
                        },
                        '404': {
                            description: 'Obiettivo con questo ID non trovato'
                        }
                    }
                },
            },
            '/modify/transaction/{transactionId}/{newAmount}/{newDescription}/{newDate}/{newCategory}/{newRecurrency}': {
                put: {
                    tags: ['Transazioni'],
                    summary: "Modifica una transazione",
                    description: "Modifica dal server una transazione con quell'identificativo con i valori passati",
                    parameters: [
                        {
                            "name": "transactionId",
                            "in": "path",
                            "required": true,
                            "schema": { "type": "string" },
                            "example": "61b79bfff0d6c37a84892105"
                        },
                        {
                            "name": "newAmount",
                            "in": "path",
                            "required": true,
                            "schema": { "type": "number", "format": "float" },
                            "example": "-35.00"
                        },
                        {
                            "name": "newDescription",
                            "in": "path",
                            "required": true,
                            "schema": { "type": "string" },
                            "example": "Spesa alla Lidl"
                        },
                        {
                            "name": "newDate",
                            "in": "path",
                            "required": true,
                            "schema": { "type": "string", "format": "date" },
                            "example": "2021-12-13"
                        },
                        {
                            "name": "newCategory",
                            "in": "path",
                            "required": true,
                            "schema": { "type": "string" },
                            "example": "Alimenti"
                        },
                        {
                            "name": "newRecurrency",
                            "in": "path",
                            "required": true,
                            "schema": { "type": "integer" },
                            "example": "0"
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'Transazione modificata con successo',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/transazioni'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Put Transazione non riuscita o errore nella connessione al database'
                        },
                        '404': {
                            description: 'Transazione con questo ID non trovata'
                        }
                    }
                },
            },
            '/modify/goal/{goalId}/{newAmount}/{newDescription}/{newDate}': {
                put: {
                    tags: ['Obiettivi'],
                    summary: "Modifica un obiettivo",
                    parameters: [
                        {
                            "name": "goalId",
                            "in": "path",
                            "required": true,
                            "schema": { "type": "string" },
                            "example": "61b660933b7ecc2de476ab2e"
                        },
                        {
                            "name": "newAmount",
                            "in": "path",
                            "required": true,
                            "schema": { "type": "number", "format": "float" },
                            "example": "264800"
                        },
                        {
                            "name": "newDescription",
                            "in": "path",
                            "required": true,
                            "schema": { "type": "string" },
                            "example": "Lamborghini Aventador"
                        },
                        {
                            "name": "newDate",
                            "in": "path",
                            "required": true,
                            "schema": { "type": "string", "format": "date" },
                            "example": "2021-12-13"
                        }
                    ],
                    description: "Modifica dal server un obiettivo con quell'identificativo con i nuovi valori",
                    responses: {
                        '200': {
                            description: 'Obiettivo modificato con successo',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/goal'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Put obiettivi non riuscita o errore nella connessione al database',
                        },
                        '404': {
                            description: 'Obiettivo con questo ID non trovato'
                        }
                    }
                },
            },
        },
        components: {
            schemas: {
                bilancio: {
                    type: "object",
                    properties: {
                        "amount": {
                            type: "number",
                            format: "float",
                            description: "Cifra del bilancio",
                            example: '1036.74'
                        }
                    }
                },
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
                transazioni: {
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
                            type: 'integer',
                        }
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
                            type: 'integer',
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
                            type: 'integer',
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
const { serve } = require("swagger-ui-express");
app.use(cors());
app.use(Express.urlencoded());
app.use(Express.json());

MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, (error, client) => {
    database = client.db(DATABASE);
    console.log("Mongo DB Connection Successfull");
});

var DATABASE = "IS_G08";
var database;
app.listen(49146, function () {

});


/** 
* @swagger
* /balance:
*   get:
+     tags:
*      - Bilancio
*     summary: Ottiene bilancio.
*     description: Ottiene dal server il bilancio delle transazioni dell'utente
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               amount:
*                  type: number
*                  format: float
*                  description: Cifra del bilancio
*                  example: 1036.74            
*     responses:
*       200:
*         description: bilancio ottenuto con successo
*         content:
*          applications/json:
*            schema:
*              $ref: #/components/schemas/bilancio
*       400:
*          description: Bilancio non esistente o errore nella connessione al database
*          content:
*          applications/json:
*            example:
*              message: THE BALANCE API IS NOT WORKING!           
*/
app.get('/balance', (request, response) => {

    database.collection("Utenti").findOne({ "id": "1" }, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            response.send(result);
        }
    })
})


/**
 * @swagger
 * /categoria:
 *   get:
 *    tags:
 *      - Categorie
 *     summary: Ottiene categorie.
 *     description: Ottiene dal server la lista delle categorie predefinite
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                  type: ObjectId
 *                  description: Identificativo univoco
 *                  example: ObjectId("61a8ac85b7eebf0587e16165")
 *               name:
 *                  type: string
 *                  description: Il nome della categoria.
 *                  example: Alimenti
 *               
 *     responses:
 *       200:
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



/**
 * @swagger
 * /goal:
 *   get:
 *    tags:
 *      - Obiettivi
 *     summary: Ottiene obiettivi.
 *     description: Ottiene dal server la lista di tutti gli obiettivi
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                  type: ObjectId
 *                  description: Identificativo univoco
 *                  example: ObjectId("61a8ac85b7eebf0587e16165")
 *               description:
 *                  type: string
 *                  description: La descrizione dell'obiettivo.
 *                  example: Lamborghini Huracan
 *               amount
 *                  type: number
 *                  format: float
 *                  description: Cifra dell'obiettivo
 *                  example: 197500
 *              date
 *                  type: string
 *                  format: date
 *                  description: La data di scadenza dell'obiettivo
 *                  example: 2021-03-21
 *     responses:
 *       200:
 *         description: Obiettivi ottenuti con successo
 *         content:
 *          applications/json:
 *            schema:
 *              $ref: #/components/schemas/goal
 *       
 *       400:
 *          description: Get Obiettivi non riuscita o errore nella connessione al database
 *          content:
 *          applications/json:
 *            example:
 *              message: THE GOALS API IS NOT WORKING!          
*/
app.get('/goals', (request, response) => {
    database.collection("Goal").find({}).toArray((error, result) => {
        if (error) {
            console.log(error);
        } else {
            response.send(result);
        }
    })
})


/**
 * @swagger
 * /transactions:
 *   get:
 *    tags:
 *      - Transazioni
 *     summary: Ottiene transazioni.
 *     description: Ottiene dal server la lista di tutte le transazioni, ossia entrate e spese
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                  type: ObjectId
 *                  description: Identificativo univoco
 *                  example: ObjectId("61a8ac85b7eebf0587e16165")
 *               description:
 *                  type: string
 *                  description: La descrizione della transazione.
 *                  example: Spesa alla coop
 *               category:
 *                  $ref: #/components/schemas/categorie
 *                  example: Alimenti
 *               amount
 *                  type: number
 *                  format: float
 *                  description: Cifra del bilancio
 *                  example: 54.32 
 *              date
 *                  type: string
 *                  format: date
 *                  description: La data della transazione
 *                  example: 2021-8-22
 *              recurrency
 *                  type: integer
 *                  description: Giorni dalla ricorrenza
 *                  example: 0             
 *     responses:
 *       200:
 *         description: Transazioni ottenute con successo
 *         content:
 *          applications/json:
 *            schema:
 *              $ref: #/components/schemas/transazioni
 *       
 *       400:
 *          description: Transazioni non riuscita o errore nella connessione al database
 *          content:
 *          applications/json:
 *            example:
 *              message: THE TRANSACTIONS API IS NOT WORKING!
 *              
*/
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

/**
 * @swagger
 * /transaction/{transactionId}:
 *   get:
 *    tags:
 *      - Transazioni
 *     summary: Ritorna transazione
 *     description: Manda al server una richiesta di get della transazione con quel identificativo
 *     parameters:
 *         name: transactionId
 *       - in: path
 *         required: true
 *         schema:
 *              type : string
 *         example: 61b79bfff0d6c37a84892105
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                  type: ObjectId
 *                  description: Identificativo univoco
 *                  example: ObjectId("61b79bfff0d6c37a84892105")
 *               description:
 *                  type: string
 *                  description: La descrizione della transazione.
 *                  example: Bucato
 *              category:
 *                  $ref: #/components/schemas/categorie
 *                  example: Lavanderia
 *              amount:
 *                   type: number
 *                   format: float
 *                   description: L'ammontare della transazione.
 *                   example: 4.45
 *               date:
 *                  type: string
 *                  format: date
 *                  description: La data della transazione.
 *                  example: 2021-08-22
 *               recurrency:
 *                  type: integer
 *                  description: Giorni dalla ricorrenza.
 *                  example: 0
 *               
 *     responses:
 *       200:
 *         description: Transizione ritornata con successo
 *         content:
 *          applications/json:
 *            schema:
 *              $ref: #/components/schemas/transazioni
 *       
 *       400:
 *          description: Get transazione non riuscita o errore nella connessione al database
 *          content:
 *          applications/json:
 *            example:
 *       404:
 *          description:Transazione con questo ID non trovata              
*/
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

/**
 * @swagger
 * /goal/{goalID}:
 *   get:
 *    tags:
 *      - Obiettivi
 *     summary: Ritorna un obiettivo.
 *     description: Manda al server una richiesta di get dell'obiettivo con quel identificativo 
 *       parameters:
 *         name: goalId
 *       - in: path
 *         required: true
 *         schema:
 *              type : string
 *         example: 61b660933b7ecc2de476ab2e
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                  type: ObjectId
 *                  description: Identificativo univoco
 *                  example: ObjectId("61a8ac85b7eebf0587e16165")
 *               description:
 *                  type: string
 *                  description: La descrizione dell'obiettivo.
 *                  example: Lamborghini
 *              amount:
 *                   type: number
 *                   format: float
 *                   description: L'ammontare della somma per il raggiungimento dell'obiettivo.
 *                   example: 235235.45
 *               date:
 *                  type: string
 *                  format: date
 *                  description: La data di scadenza dell'obiettivo.
 *                  example: 2021-8-22
 *     responses:
 *       200:
 *         description: Obiettivo ritornato con successo
 *         content:
 *          applications/json:
 *            schema:
 *              $ref: #/components/schemas/obiettivi
 *       
 *       400:
 *          description: Get obiettivo non riuscita o errore nella connessione al database
 *       404: 
 *          description: Obiettivo con questo ID non trovato
 *              
*/
app.get('/goal/:id', (request, response) => {


    database.collection("Goal").findOne({ "_id": ObjectId(request.params.id) }, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            response.send(result);
        }
    })
})


/**
 * @swagger
 * /entrate:
 *   post:
 *    tags:
 *      - Transazioni
 *     summary: Registra un'entrata.
 *     description: Manda al server una entrata
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                  type: ObjectId
 *                  description: Identificativo univoco
 *                  example: ObjectId("61a8ac85b7eebf0587e16165")
 *               description:
 *                  type: string
 *                  description: La descrizione della transazione.
 *                  example: Stipendio
 *              category
 *                  $ref: #/components/schemas/categorie
 *                  example: Extra
 *              amount:
 *                   type: number
 *                   format: float
 *                   description: L'ammontare della transazione.
 *                   example: 1235.45
 *               date:
 *                  type: string
 *                  format: date
 *                  description: La data della transazione.
 *                  example: 2021-08-22
 *               recurrency:
 *                  type: integer
 *                  description: Giorni dalla ricorrenza.
 *                  example: 0
 *               
 *     responses:
 *       200:
 *         description: Entrata registrata con successo
 *         content:
 *          applications/json:
 *            schema:
 *              $ref: #/components/schemas/transazioni
 *       
 *       400:
 *          description: Post entrata non riuscita o errore nella connessione al database         
*/
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

/**
 * @swagger
 * /spese:
 *   post:
 *    tags:
 *      - Transazioni
 *     summary: Registra una spesa.
 *     description: Manda al server una spesa
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                  type: ObjectId
 *                  description: Identificativo univoco
 *                  example: ObjectId("61a8ac85b7eebf0587e16165")
 *               description:
 *                  type: string
 *                  description: La descrizione della spesa.
 *                  example: Bucato
 *              category
 *                  $ref: #/components/schemas/categorie
 *                  example: Lavanderia
 *              amount:
 *                   type: number
 *                   format: float
 *                   description: L'ammontare della transazione.
 *                   example: 4.45
 *               date:
 *                  type: string
 *                  format: date
 *                  description: La data della transazione.
 *                  example: 2021-12-12
 *               recurrency:
 *                  type: integer
 *                  description: Giorni dalla ricorrenza.
 *                  example: 0
 *               
 *     responses:
 *       200:
 *         description: Spesa registrata con successo
 *         content:
 *          applications/json:
 *            schema:
 *              $ref: #/components/schemas/transazioni
 *       
 *       400:
 *          description: Post spesa non riuscita o errore nella connessione al database
 *              
*/
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

/**
 * @swagger
 * /goal:
 *   post:
 *    tags:
 *      - Obiettivi
 *     summary: Registra un obiettivo.
 *     description: Manda al server un obiettivo
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                  type: ObjectId
 *                  description: Identificativo univoco
 *                  example: ObjectId("61a8ac85b7eebf0587e16165")
 *               description:
 *                  type: string
 *                  description: La descrizione dell'obiettivo.
 *                  example: Lamborghini
 *              amount:
 *                   type: number
 *                   format: float
 *                   description: L'ammontare della somma per il raggiungimento dell'obiettivo.
 *                   example: 235235.45
 *               date:
 *                  type: string
 *                  format: date
 *                  description: La data di scadenza dell'obiettivo.
 *                  example: 2021-08-22               
 *     responses:
 *       200:
 *         description: Obiettivo registrato con successo
 *         content:
 *          applications/json:
 *            schema:
 *              $ref: #/components/schemas/goal
 *       
 *       400:
 *          description: Post obiettivo non riuscito o errore nella connessione al database             
*/
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

/**
 * @swagger
 * /delete/{transactionId}:
 *   delete:
 *    tags:
 *      - Transazioni
 *     summary: Elimina una spesa.
 *     description: Manda al server una richiesta di eliminazione della transazione con quel identificativo
 *     parameters:
 *       name: transactionId
 *       - in: path
 *         required: true
 *         schema:
 *              type : string
 *         example: 61b79bfff0d6c37a84892105
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                  type: ObjectId
 *                  description: Identificativo univoco
 *                  example: ObjectId("61a8ac85b7eebf0587e16165")
 *               description:
 *                  type: string
 *                  description: La descrizione della transazione.
 *                  example: Spesa alla coop
 *              amount:
 *                   type: number
 *                   format: float
 *                   description: L'ammontare della transazione.                  
 *                   example: 235.45
 *               date:
 *                  type: string
 *                  format: date
 *                  description: La data della transazione.
 *                  example: 2021-12-12
 *               recurrency:
 *                  type: integer
 *                  description: Giorni dalla ricorrenza.
 *                  example: 0
 *               
 *     responses:
 *       200:
 *         description: Transizione eliminata con successo
 *         content:
 *          applications/json:
 *            schema:
 *              $ref: #/components/schemas/transazioni
 *       
 *       400:
 *          description: Delete transazione non riuscita o errore nella connessione al database
 *          content:
 *          applications/json:
 *            example:
 *       404:
 *          description:Transazione con questo ID non trovata
 *              
*/
// OR
/**
 * @swagger
 * /delete/{goalID}:
 *   delete:
 *    tags:
 *      - Obiettivi
 *     summary: Elimina un obiettivo.
 *     description: Manda al server una richiesta di eliminazione dell'obiettivo con quel identificativo 
 *     parameters:
 *       name: goalId
 *       - in: path
 *         required: true
 *         schema:
 *              type : string
 *         example: 61b660933b7ecc2de476ab2e
 *      content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                  type: ObjectId
 *                  description: Identificativo univoco
 *                  example: ObjectId("61a8ac85b7eebf0587e16165")
 *               description:
 *                  type: string
 *                  description: La descrizione dell'obiettivo.
 *                  example: Lamborghini
 *              amount:
 *                   type: number
 *                   format: float
 *                   description: L'ammontare della somma per il raggiungimento dell'obiettivo.
 *                   example: 235235.45
 *               date:
 *                  type: string
 *                  format: date
 *                  description: La data di scadenza dell'obiettivo.
 *                  example: 2021-8-22
 *     responses:
 *       200:
 *         description: Obiettivo eliminato con successo
 *         content:
 *          applications/json:
 *            schema:
 *              $ref: #/components/schemas/obiettivi
 *       
 *       400:
 *          description: Delete obiettivo non riuscita o errore nella connessione al database
 *       404: 
 *          description: Obiettivo con questo ID non trovato
 *              
*/
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


/**
 * @swagger
 * /modify/transaction/{transactionId}/{newAmount}/{newDescription}/{newDate}/{newCategory}/{newRecurrency}
 *  put:
 *      tags:
 *          - Transazioni
 *      summary: Modifica unatransazione
 *      description: Modifica dal server una transazione con quell'identificativo con i nuovi valori.
 *      parameters:
 *       name: transactionId
 *       - in: path
 *         required: true
 *         schema:
 *              type : string
 *         example: 61b79bfff0d6c37a84892105
 *       name: newAmount
 *       - in: path
 *         required: true
 *         schema:
 *              type : number
 *              format: float
 *         example: -35.00
 *       name: newDescription
 *       - in: path
 *         required: true
 *         schema:
 *              type : string
 *         example: Spesa alla Lidl
 *       name: newDate
 *       - in: path
 *         required: true
 *         schema:
 *              type : string
 *              format: date
 *         example: 2021-12-13
 *       name: newCategory
 *       - in: path
 *         required: true
 *         schema:
 *              type : string
 *         example: Alimenti
 *       name: newRecurrency
 *       - in: path
 *         required: true
 *         schema:
 *              type : integer
 *         example: 0
 *      responses:
 *       200:
 *         description: Transazione modificata con successo
 *         content:
 *          applications/json:
 *            schema:
 *              $ref: #/components/schemas/transazione
 *       400:
 *          description: Put Transazione non riuscita o errore nella connessione al database
 *       404:
 *          description: Transazione con questo ID non trovata
 *              
 *          
 */
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


/**
 * @swagger
 * /modify/goal/{goalId}/{newAmount}/{newDescription}/{newDate}
 *  put:
 *      tags:
 *          - Obiettivi
 *      description: Modifica dal server un obiettivo con quell'identificativo con i nuovi valori.
 *      parameters:
 *       name: goalId
 *       - in: path
 *         required: true
 *         schema:
 *              type : string
 *         example: 61b79bfff0d6c37a84892105
 *       name: newAmount
 *       - in: path
 *         required: true
 *         schema:
 *              type : number
 *              format: float
 *         example: 264800
 *       name: newDescription
 *       - in: path
 *         required: true
 *         schema:
 *              type : string
 *         example: Lamborghini Aventador
 *       name: newDate
 *       - in: path
 *         required: true
 *         schema:
 *              type : string
 *              format: date
 *         example: 2021-12-13
 *      responses:
 *       200:
 *         description: Obiettivo modificato con successo
 *         content:
 *          applications/json:
 *            schema:
 *              $ref: #/components/schemas/obiettivi
 *       
 *       400:
 *          description: Put obiettivi non riuscita o errore nella connessione al database
 *       404: 
 *          description: Obiettivo con questo ID non trovato                
 */
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
module.exports = app;