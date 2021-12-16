var test = require('tape');
var request = require('supertest');
var app = require('../server/server');

test('TEST1: Correct employee returned', function (assert) {
    request(app)
        .get('/balance')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            console.log(res.body.balance);
            var balanceResult = parseInt(res.body.balance);
            var result = false;
            if (!isNaN(balanceResult)) {
                result = true;
            }

            assert.error(err, 'No error');
            assert.notEqual(true, result, 'Balance retrieved Correctly');
            assert.end();
        });
});
/*
test('TEST2: correct employee added', function (assert) {
    request(app)
        .post('/api/employee')
        .send({
            "EmployeeId": "testID", "EmployeeName": "Antonio1 Bucchiarone", "Department": "IT",
            "DateOfJoining": "12-12-2020",
            "PhotoFileName": "foto.jpg"
        })
        .end((err, res) => {

            if (err) {
                reject(new Error('An error occured with the employee Adding API, err: ' + err))
            }

            assert.error(err, 'No error');
            assert.isEqual("Added Successfully", res.body, "Employee added correctly")
            assert.end();
        });
});

test('TEST3:  employee deleted', function (assert) {
    request(app)
        .del('/api/employee/15')
        .end((err, res) => {

            if (err) {
                reject(new Error('An error occured with the employee Adding API, err: ' + err))
            }

            assert.error(err, 'No error');
            assert.isEqual("Deleted Successfully", res.body, "Employee deleted correctly")
            assert.end();
        });
});*/