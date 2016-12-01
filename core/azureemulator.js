var colors = require('colors');

module.exports = {
    context: {
        done: function(context, res) {
            if (res) {
                if (res.status == 200 || !res.status)
                    console.log(JSON.stringify(res).gray);
                else
                    console.log(JSON.stringify(res).red);
                    process.exit(1);
            }else{
                console.log('ok!'.gray);
            }
            process.exit(0);
        }
    },
    req: {
        query: {},
        body: {}
    },
    res: {}
}


