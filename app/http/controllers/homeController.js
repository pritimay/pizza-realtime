const Menu = require('../../models/menu')

function homeController(){
    return {
        /*index(request,response){
            // find() method is used to find all the data from the database
            //pizzas param-> if find method returns any result then it will be available in pizzas param \

            //one way of getting data from the database
           /* Menu.find().then(function(data){
              
                console.log( data);
                response.render('home',{pizzas:data});

            });


            //second way of getting the data from the database using async
   
        }*/

        async index(request,response){
            const data = await Menu.find();
            console.log("async used value"+ data);
            response.render('home', {data:data});


        }
    }
}

module.exports = homeController