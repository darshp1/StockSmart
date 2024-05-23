
const mongoose = require("mongoose")

const WatchList  = mongoose.Schema({
    company_t: {
        type: String,
        required: true,
        trim: true,
    },
    company_n: {
        type: String,
        required: true,
    },
    s_price: {   //.c
        type: Number,
        required: true,
        trim: true,
    },

    s_change: {   //.d
        type: Number,
        required: true,
        trim: true,
    },

    s_perc_c: {   //.dp (percentage)
        type: Number,
        required: true,
        trim: true,
    },
   
});


const MyModel = mongoose.model('watchlist_db', WatchList ); 
module.exports = MyModel;
