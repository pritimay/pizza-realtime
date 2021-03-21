console.log("hey pritimaya");

import axios from 'axios';
import noty from 'noty';

let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cart-counter');

//we can use fetch api for java script but we are using axios. 
function updateCart(pizza){

    axios.post('/update-cart', pizza).then( res =>{
            cartCounter.innerText = res.data.totalQty;
    })


}

addToCart.forEach((btn) => {
    btn.addEventListener('click',(e)=>{
        let pizza = JSON.parse(btn.dataset.pizza);
        console.log(pizza);
        updateCart(pizza);
    })

})