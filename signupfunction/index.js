require('dotenv').config();

var config = require('../config/firebase.js');
var validator = require('validator');

var firebase = require('firebase');
require('firebase/auth');
require('firebase/database');

var genId = require('gen-id');

function getCode() {
    genId('aaa');
    var code = genId().generate().toUpperCase();
    genId('nnnn');
    return code + genId().generate();
}

module.exports = function(context, req) {

    var result = validate(context, req);

    if (result.success) {

        if (firebase.apps.length === 0) {
            firebase.initializeApp(config);
        }

        var entrant = { name: req.body.name, email: req.body.email, code: getCode() };
        var key = entrant.email.split('.').join('_');
        
        firebase.database().ref('entrants/' + key).once('value')
            .then(function(snapshot) {

                var data = snapshot.val();
                entrant.code = data ? data.code : entrant.code;

                firebase.database().ref('entrants/' + key).set(entrant)
                    .then(function(result) {
                        context.done({body:entrant});
                    })
                    .catch(function(error) {
                        res = {
                            status: 400,
                            body: JSON.stringify(arguments)
                        };
                        context.done(null, res);
                    });
            });


    } else {
        res = {
            status: 400,
            body: result.message
        };
        context.done(null, res);
    }
};


var validate = function(context, req) {

    if (!req.body.name) {
        return { message: 'Você deve informar o seu nome completo.', success: false };
    }

    if (!req.body.email) {
        return { message: 'Você deve informar o seu e-mail.', success: false };
    } else if (!validator.isEmail(req.body.email)) {
        return { message: 'Você deve informar um e-mail válido.', success: false };
    }

    return { success: true };
};