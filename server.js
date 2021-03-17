const express = require('express')
const app = express()

const ejs = require('ejs');
const path = require('path');

const expressLayout = require('express-ejs-layouts');

const PORT = process.env.PORT || 4000; 

//Setting assets folder in node js
app.use(express.static('public'));




///setting the template engine
app.use(expressLayout);

app.set('views',path.join(__dirname,'/resources/views'))

app.set('view engine','ejs');

app.get("/", (request,response)=>{

    //response.send("Hello froms server");
   // response.render('Hello from server by pritimaya');

   response.render('home');

});

app.get("/cart",(request,response)=>{

response.render('customers/cart');

});

app.listen(PORT,()=>{
    console.log("listening to port for pritimaya "+ PORT)
});