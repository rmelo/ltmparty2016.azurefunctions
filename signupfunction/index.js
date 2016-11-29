require('dotenv').config();
var config = require('../config/firebase.js');
var validator = require('validator');
var firebase = require('firebase');
require('firebase/auth');
require('firebase/database');

module.exports = function (context, req) {

    var result = execute(context, req);

    if (result.success) {

        if (firebase.apps.length === 0){
            context.log('firebase initialize...');
            firebase.initializeApp(config);
        }
        context.log('firebase initialized [ok]!');

        var entrant = { name: req.body.name, email: req.body.email, birthdate: req.body.birthdate };
        var key = entrant.email.split('.').join('_');

        context.log('Adding entrant!');

        var a = firebase.database().ref('entrants/' + key).set(entrant).then(function () {
            context.done();
        }).catch(function () {
            context.log('Erro in firebase on entrants:');
            res = {
                status: 400,
                body: JSON.stringify(arguments)
            };
            context.done(null, res);
        });
    } else {
        res = {
            status: 400,
            body: result.message
        };
        context.done(null, res);
    }
};


var execute = function (context, req) {
    if (!req.body.name) {
        return { message: 'Você deve informar o seu nome completo.', success: false };
    }
    if (!req.body.email) {
        return { message: 'Você deve informar o seu e-mail.', success: false };
    } else if (!validator.isEmail(req.body.email)) {
        return { message: 'Você deve informar um e-mail válido.', success: false };
    }
    if (!req.body.birthdate) {
        return { message: 'Você deve informar a data de seu aniversário.', success: false };
    }
    return { success: true };
};