const express = require('express')
const app = express()

const ejs = require('ejs');
const path = require('path');

const expressLayout = require('express-ejs-layouts');

const mongoose = require('mongoose');

//Database connection

const url= 'mongodb://localhost:pizzadelivery';
mongoose.connect( url, {useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:true});
const connection = mongoose.connection;
connection.once('open', () =>{
    console.log("connection successfull");
}).catch(err => {
    console.log("error occured while connection")
});





const PORT = process.env.PORT || 4000; 

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