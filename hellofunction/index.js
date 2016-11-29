module.exports = function (context, req) {
    res = {
        body: "Hello " + (req.query.name || req.body.name)
    };
    context.log(res.body);
    context.done(null, res);
};