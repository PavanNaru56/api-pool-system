
//connect the mongodb
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://pavannaru56:yeISXySkrESURxpF@cluster0.rpjclhn.mongodb.net/api-pool-system?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error connecting the mongoDB'));

db.once('open',function(){
    console.log('Connected to the database');
});

module.exports = db;