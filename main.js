var azure = require('./core/azureemulator.js');
var signup = require('./signupfunction/index.js');


// var entrant = {
//     name:'Rodrigo Melo',
//     email:'rmelo@grupoltm.com.br'
// };
var entrant = {
    name:'Morimar Moura',
    email:'mmoura@grupoltm.com.br'
};
azure.req.body = entrant;
signup(azure.context, azure.req);