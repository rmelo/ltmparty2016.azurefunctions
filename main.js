var azure = require('./core/azureemulator.js');
var signup = require('./signupfunction/index.js');
var raffle = require('./rafflefunction/index.js');


var entrant = {
    name:'Rodrigo Pereira de Melo',
    email:'rdg.melo@gmail.com'
};
// entrant.award = {
//     title:'Viagem para Miami'
// }
// var entrant = {
//     name:'Morimar Moura',
//     email:'mmoura@grupoltm.com.br'
// };
azure.req.body = entrant;

signup(azure.context, azure.req);
//raffle(azure.context);