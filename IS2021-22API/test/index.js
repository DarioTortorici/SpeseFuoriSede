var test = require('tape');
var test2 = require('tape');
var test3 = require('tape');
var request = require('supertest');
var app = require('../server/server');

test('TEST1: Correct balance returned', function (assert) {
    request(app)
        .get('/balance')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            var balanceResult = parseInt(res.body.balance);
            var result = false;
            if (!isNaN(balanceResult)) {
                result = true;
            }

            assert.error(err, 'No error');
            assert.same(true, result, 'Balance retrieved Correctly');
            assert.end();
        });
});


test2('TEST2: Correct categories returned', function (assert) {
    request(app)
        .get('/categoria')
        .expect(200)
        .end(function (err,res){
                var errore = false;
                res.body.forEach(element => {
                    if(element.name != "Alimenti" && element.name != "Lavanderia" && element.name != "Svago" && element.name != "Salute" && element.name != "Università" && element.name != "Extra"){
                        errore = true;
                    }
                })
                assert.error(err, 'No error');
                assert.same(errore, false, 'Category retrieved Correctly');
                assert.end();
        });
        
});

test3('TEST3: Correct income insert', function (assert) {
    request(app)
        .post('/entrate')
        .expect(200)
        .send({
            "entrateAmount": "100", "transactionCategory": "Alimenti", "entrateDescription": "Spesa settimana",
            "entrateDate": "12-12-2020",
            "entrateRecurrencyDays": "0"
        })
        .end(function (err,res){
            assert.error(err, 'No error');
            assert.same(res.body, "Entrata inserita", 'Income inserted Correctly');
            assert.end();
        });
});