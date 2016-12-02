require('dotenv').config();

var config = require('../config/firebase.js');
var firebase = require('firebase');
require('firebase/auth');
require('firebase/database');

module.exports = function (context) {

    if (firebase.apps.length === 0)
        firebase.initializeApp(config);

    firebase.database().ref('entrants').once('value')
        .then(function (snapshot) {

            var entrants = [];

            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                if (!childData.award)
                    entrants.push(childData);
            });

            var winner = entrants[Math.floor(Math.random() * entrants.length)];
            var key = winner.email.split('.').join('_');

            var awards = ['Uma viagem para Miami', 'Um Drone Parrot', 'Um Voucher de R$ 500,00'];
            var award = awards[Math.floor(Math.random() * awards.length)];

            winner.award = { title: award };

            firebase.database().ref('entrants/' + key).set(winner)
                .then(function (result) {
                    context.done(null, {});
                })
                .catch(function (error) {
                    res = {
                        status: 400,
                        body: JSON.stringify(arguments)
                    };
                    context.done(null, res);
                });
        })
        .catch(function (result) {
            res = {
                status: 400,
                body: result.message
            };
        });
};