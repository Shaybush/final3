// getting-started.js
const mongoose = require('mongoose');
const {config} = require('../config/secret')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://${config.userDb}:${config.passDb}@cluster0.kqqya1q.mongodb.net/project`);
  console.log("mongo connected")
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}