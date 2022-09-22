const express = require("express");
const cors =require("cors");
const path = require("path");
const http = require("http");
const { routesInit } = require("./routes/config_routes");
const app = express();

require("./db/mongo_connect")

// middleware start

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
// middleware end

routesInit(app);

const server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port);