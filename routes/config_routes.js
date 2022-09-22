const indexR = require("./index");
const userR = require('./users');
const bookR = require('./books');

exports.routesInit = app =>{
    app.use("/",indexR);
    app.use("/users",userR);
    app.use("/books",bookR);
}