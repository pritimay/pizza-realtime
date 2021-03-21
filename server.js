//this line will give access to all the secret keys
require('dotenv').config()

const express = require('express')

const app = express()

const ejs = require('ejs');

const path = require('path');

const expressLayout = require('express-ejs-layouts');

const mongoose = require('mongoose');

const flash = require('express-flash')
//express session for storing the session cart variables
const session = require('express-session');

//this is used to store the session in database. By default it is stored in memory
const MongoDbStore = require('connect-mongodb-session')(session);

const PORT = process.env.PORT || 4000; 

const url= 'mongodb://localhost:27017/pizzadelivey';

var sessionDbStore = new MongoDbStore({
    mongoUrl: url,
    collection : 'mine',
    databaseName: 'pizzadelivey',
        
  });
app.use(require('express-session')({
    secret: process.env.COOKIE_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 2},
    store: sessionDbStore,
    resave: false,
    saveUninitialized: false,
   
        
}));

app.use(flash());

//Setting assets folder in node js
app.use(express.static('public'));

///setting the template engine
app.use(expressLayout);

app.set('views',path.join(__dirname,'/resources/views'))

app.set('view engine','ejs');

require('./routes/web')(app);

app.listen(PORT,()=>{
    console.log("listening to port for pritimaya "+ PORT)
});



mongoose.connect( url, {useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:true});
const connection = mongoose.connection;
connection.once('open', () =>{
    console.log("hi connection")
    console.log("connection successfull");
}).catch(err => {
    console.log("error occured while connection")
});


//session config for stroing cart



//it is used to store the session in database
//MongoDbStore(session)

