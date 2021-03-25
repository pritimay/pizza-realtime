function cartController() {

    return {
        cart(request, response) {

            response.render('customers/cart');
        },
        update(request, response) {

            console.log("pritimaya" + request.body.id);
            /*let cart = {
                items:{
                    pizzaId: { item : pizzaObject, qty:0}
                },
                totalQty: 0,
                totalPrice : 0,


            }*/

            
        
           /* Below code will add cart element to the sesion but remember to use express json in node js we have to use 
            express.json() in server.js*/
           if (!request.session.cart) {
                request.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0,
                }
            }

            let cart = request.session.cart;
            if (!cart.items[request.body._id]) {
                cart.items[request.body._id] = {
                    qty: 1,
                    item: request.body
                }
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = Number(cart.totalPrice) + Number(request.body.price);
                console.log("total price by calculation" + cart.totalPrice)
            } else {
                cart.items[request.body._id].qty = cart.items[request.body._id].qty + 1;
                cart.totalQty = cart.totalQty + 1
                
                cart.items[request.body._id].totalPrice = Number(cart.items[request.body._id].totalPrice) + Number(request.body.price);

                console.log("total price by calculation" + cart.items[request.body._id].totalPrice)
            }
            
            response.json({ totalQty: request.session.cart.totalQty });
            
            
        }

    }

}

module.exports = cartController;