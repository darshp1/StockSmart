
const mongoose = require("mongoose")

const mySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        required: true,
        trim: true,
    },
});


const PortFolio  = mongoose.Schema({
    company_t: {
        type: String,
        required: true,
        trim: true,
    },
    company_n: {
        type: String,
        required: true,
    },
    old_c: {   //.c
        type: Number,
        required: true,
        trim: true,
    },

    Quantity: {   //.d
        type: Number,
        required: true,
        trim: true,
    },
    purse: {
        type:Number,
        required: true,
        trim: true,
    }
});


//const MyModel = mongoose.model('watchlist_db', WatchList); 

const MyModel = mongoose.model('portfolio_db', PortFolio); 
module.exports = MyModel;


/*
// for PortFolio

const MyModel = require("./channel");

app.get("/insert", (req, res) => {
    var Mymodel = new MyModel();
    //Mymodel.name = "darsh";
    //Mymodel.type = "web";
    Mymodel.company_t='aapl';
    Mymodel.company_n='apple';
    Mymodel.s_price=42;
    Mymodel.s_change=20;
    Mymodel.s_perc_c=50;

    Mymodel.save()
        .then(savedInstance => {
            console.log("Data inserted successfully:", savedInstance);
            res.status(200).send({"msg": "done here"});
        })
        .catch(err => {
            console.error("Error inserting data:", err);
            res.status(500).send({"error": "An error occurred while saving data"});
        });
});
app.get("/gd", async (req, res) => {
    try {
        const data = await MyModel.find({});
        //console.log("Data retrieved successfully:", data);
        res.status(200).send(data);
    } catch (err) {
        console.error("Error retrieving data:", err);
        res.status(500).send({"error": "An error occurred while retrieving data"});
    }
});

*/