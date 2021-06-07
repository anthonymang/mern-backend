require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
});

const db = mongoose.connection;

// Set up event for db to print connection
db.once('open', () => {
    console.log(`Connect to MongoDB at ${db.host}: ${db.port}`)
})

db.on('error', (error) =>{
    console.log(`Database error`, error)
})

// import all models here
const User = require('./User')

module.exports = {
    User
}