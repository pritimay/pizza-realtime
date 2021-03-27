const mongooses = require('mongoose');
const Schema = mongooses.Schema;
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default : 'customer' },

    }, {timestamps : true});
    
module.exports = mongooses.model('user',userSchema);