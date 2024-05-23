
const mongoose = require("mongoose")

const Wallet  = mongoose.Schema({
    w: {
        type: Number,
        required: true,
        trim: true,
    },
   
   
});


const MyModel = mongoose.model('wallet_db', Wallet); 
module.exports = MyModel;
