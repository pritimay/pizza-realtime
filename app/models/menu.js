const mongooses = require('mongoose');
const Schema = mongooses.Schema;

const menuschema = new Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    size: { type: String, required: true },
    image: { type: String, required: true },
    });
    
module.exports = mongooses.model('menu',menuschema);