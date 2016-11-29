var colors = require('colors');

module.exports = {
        context:{
        done:function(context, res){
            if(res.status==200 || !res.status)
                console.log(JSON.stringify(res).gray);
            else
                console.log(JSON.stringify(res).red);
        }
    },
    req:{
        query:{},
        body:{}
    },
    res:{}
}


