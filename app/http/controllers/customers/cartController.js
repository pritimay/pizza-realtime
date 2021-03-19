function cartController(){

    return {
        cart(request,response){
           
            response.render('customers/cart');
        }

    }

}

module.exports= cartController;