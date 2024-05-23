const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');


// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// mongodb+srv://darshpat:<password>@cluster0.93epfez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// mongodb+srv://darshpat:<password>@cluster0.93epfez.mongodb.net/
// pB6fz3sO1L83U8Qe

const dbms_url = "mongodb+srv://darshpat:pB6fz3sO1L83U8Qe@cluster0.93epfez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(dbms_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'check1' 
}).then(() => {
    console.log("MongoDB connected successfully");
}).catch((err) => {
    console.error("MongoDB connection failed:", err);
});


const app = express();
const apiKey = 'cmvcsj9r01qog1iuu33gcmvcsj9r01qog1iuu340';

function getDates() {
  const currentDate = new Date();
  const previousDate = new Date(currentDate.getTime() - 731 * 24 * 60 * 60 * 1000);
  const formatDateString = (date) => {
    return date.toISOString().split('T')[0];
  };
  return {
    d1: formatDateString(currentDate),
    d2: formatDateString(previousDate),
  };
}

function getDates2() {
  const currentDate = new Date();
  const previousDate = new Date(currentDate.getTime() - 500 * 24 * 60 * 60 * 1000);
  const formatDateString = (date) => {
    return date.toISOString().split('T')[0];
  };
  return {
    d1: formatDateString(currentDate),
    d2: formatDateString(previousDate),
  };
}

function getDates3() {
    const currentDate = new Date();
    const previousDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    const formatDateString = (date) => {
      return date.toISOString().split('T')[0];
    };
    return {
      d1: formatDateString(currentDate),
      d2: formatDateString(previousDate),
    };
  }

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from Darsh!');
});

// Routes with CORS middleware
app.get('/get_data/:company', async (req, res) => {
  const id = req.params.company;
  const finnhubResponse = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${id}&token=${apiKey}`);
  const finnhubData = await finnhubResponse.json();
  const d = finnhubData !== null && finnhubData !== undefined && Object.keys(finnhubData).length !== 0;
  res.json({
    ok: d,
    finnhubData,
  });
});

// Highchart Company route
app.get('/highchart_company/:company', async (req, res) => {
  const { d1, d2 } = getDates();
  const id = (req.params.company || '').toUpperCase();
  const finnhubResponse = await fetch(`https://api.polygon.io/v2/aggs/ticker/${id}/range/1/day/${d2}/${d1}?adjusted=true&sort=asc&apiKey=BGXdIjTVoKYCd1cyRtW8Z0efLsPbhBEo`);
  const finnhubData = await finnhubResponse.json();
  const d = finnhubData !== null && finnhubData !== undefined && Object.keys(finnhubData).length !== 0;
  res.json({
    ok: d,
    finnhubData,
  });
});

// Get Price Stock route
app.get('/get_price_stock/:company', async (req, res) => {
  const id = req.params.company;
  const finnhubResponse = await fetch(`https://finnhub.io/api/v1/quote?symbol=${id}&token=${apiKey}`);
  const finnhubData = await finnhubResponse.json();
  const d = finnhubData !== null && finnhubData !== undefined && Object.keys(finnhubData).length !== 0;
  res.json({
    ok: d,
    finnhubData,
  });
});

// Auto Complete route
app.get('/auto_complete/:company', async (req, res) => {
  const id = req.params.company;
  const finnhubResponse = await fetch(`https://finnhub.io/api/v1/search?q=${id}&token=${apiKey}`);
  const finnhubData = await finnhubResponse.json();
  const d = finnhubData !== null && finnhubData !== undefined && Object.keys(finnhubData).length !== 0;
  res.json({
    ok: d,
    finnhubData,
  });
});

// Company News route
app.get('/company_news/:company', async (req, res) => {
  const { d1, d2 } = getDates2();
  const id = req.params.company;
  const finnhubResponse = await fetch(`https://finnhub.io/api/v1/company-news?symbol=${id}&from=${d2}&to=${d1}&&token=${apiKey}`);
  const finnhubData = await finnhubResponse.json();
  const d = finnhubData !== null && finnhubData !== undefined && Object.keys(finnhubData).length !== 0;
  res.json({
    ok: d,
    finnhubData,
  });
});

// Recommendation Trends route
app.get('/Recommendation_Trends/:company', async (req, res) => {
    const id = req.params.company;
  const finnhubResponse = await fetch(`https://finnhub.io/api/v1/stock/recommendation?symbol=${id}&token=${apiKey}`);
  const finnhubData = await finnhubResponse.json();
  const d = finnhubData !== null && finnhubData !== undefined && Object.keys(finnhubData).length !== 0;

  res.json({
    ok: d,
    finnhubData,
  });
});

// Insider Sentiment route
app.get('/Insider_Sentiment/:company', async (req, res) => {
  const id = req.params.company;
  const finnhubResponse = await fetch(`https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${id}&from=2022-01-01&token=${apiKey}`);
  const finnhubData = await finnhubResponse.json();
  const d = finnhubData !== null && finnhubData !== undefined && Object.keys(finnhubData).length !== 0;

  res.json({
    ok: d,
    finnhubData,
  });
});

// Company Peers route
app.get('/peers/:company', async (req, res) => {
  const id = req.params.company;
  const finnhubResponse = await fetch(`https://finnhub.io/api/v1/stock/peers?symbol=${id}&token=${apiKey}`);
  const finnhubData = await finnhubResponse.json();
  const d = finnhubData !== null && finnhubData !== undefined && Object.keys(finnhubData).length !== 0;

  res.json({
    ok: d,
    finnhubData,
  });
});

// Company Earnings route
app.get('/earnings/:company', async (req, res) => {
  const id = req.params.company;
  const finnhubResponse = await fetch(`https://finnhub.io/api/v1/stock/earnings?symbol=${id}&token=${apiKey}`);
  const finnhubData = await finnhubResponse.json();
  const d = finnhubData !== null && finnhubData !== undefined && Object.keys(finnhubData).length !== 0;

  res.json({
    ok: d,
    finnhubData,
  });
});


// Highchart Company route
app.get('/day_data/:company', async (req, res) => {
    const { d1, d2 } = getDates3();
    const id = (req.params.company || '').toUpperCase();
    const finnhubResponse = await fetch(`https://api.polygon.io/v2/aggs/ticker/${id}/range/1/hour/${d2}/${d1}?adjusted=true&sort=asc&apiKey=PZ5DyBcQGXoZjtS02E1NbDVp5epxbZzl`);
    const finnhubData = await finnhubResponse.json();
    const d = finnhubData !== null && finnhubData !== undefined && Object.keys(finnhubData).length !== 0;
    res.json({
      ok: d,
      finnhubData,
    });
  });

// Start the Express server
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// from here mongo 

const MyModel3 = require("./UserWallet");


app.get("/gd/uwallet", async (req, res) => {
    try {
        const data = await MyModel3.find({});
        res.status(200).send(data);
    } catch (err) {
        console.error("Error retrieving data:", err);
        res.status(500).send({"error": "An error occurred while retrieving data"});
    }
});

const MyModel = require("./channel");


app.post("/insert/portfolio", jsonParser, async (req, res) => {
    try {
        // Find existing document by company name
        const n1=req.body.ticker;
        const existingDoc = await MyModel.findOne({company_t: n1 });
        console.log(req.body);
        res.send('welcome, ' + req.body.ticker);
    
        if (existingDoc) {
                        let old_cd=existingDoc.old_c;
                        let old_qd=existingDoc.Quantity ;
                        let new_c=req.body.c;
                        if(new_c<0){
                            new_c=new_c*(-1);
                        }
                        existingDoc.old_c = parseFloat( ((old_cd*old_qd)+(new_c*req.body.q)) / (old_qd+req.body.q) );
                      
                        existingDoc.Quantity += req.body.q;
                        // existingDoc.purse = 0;
                        
                        if (existingDoc.Quantity==0){
                            const deletedata = await MyModel.deleteMany({company_t: n1});
                           console.log("deleted");
                           const wallet = await MyModel3.find({});
                           let walletData = wallet[0];
                            walletData.w = walletData.w - req.body.p;
                            //  WalletData= WalletData - req.body.wc;
                            await walletData.save();
                            console.log("update wallet",wallet);
                            //  res.json("wallet update");
                            // Save the updated document
                            const savedInstance = await existingDoc.save();
                            console.log("Data updated successfully:", savedInstance);
                        }
                        else{
                            const wallet = await MyModel3.find({});
                           let walletData = wallet[0];
                            walletData.w = walletData.w - req.body.p;
                            
                            //  WalletData= WalletData - req.body.wc;
                            await walletData.save();
                            console.log("update wallet",wallet);
                            //  res.json("wallet update");
                            // Save the updated document
                            const savedInstance = await existingDoc.save();
                            console.log("Data updated successfully:", savedInstance);
                        }
                            
                        
                    } else {
     
                    
                        const newDoc = new MyModel({

                            company_t: req.body.ticker,
                            company_n: req.body.name,
                            old_c:req.body.c,
                             Quantity: req.body.q,
                             purse: 0,
                           
                           
                        });
                        console.log('hey');
                        const savedInstance = await newDoc.save();
                        console.log("New data inserted successfully:", savedInstance);
                         
                                const wallet = await MyModel3.find({});
                                    let walletData = wallet[0];
                                    walletData.w = walletData.w - req.body.p;
                                    await walletData.save();
                                    console.log("update2 wallet",wallet);
                                console.log("new buying issue",err);
                            
                    }
        
    } catch (err) {
        console.error("Error inserting/updating data:", err,req.body);
    }
});


app.get("/gd/portfolio", async (req, res) => {
    try {
        const data = await MyModel.find({});
        //console.log("Data retrieved successfully:", data);
        res.status(200).send(data);
    } catch (err) {
        console.error("Error retrieving data:", err);
        res.status(500).send({"error": "An error occurred while retrieving data"});
    }
});


const MyModel2 = require("./wl");
/*
app.get("/insert/watchlist", (req, res) => {
    var Mymodel2 = new MyModel2();
    //Mymodel.name = "darsh";
    //Mymodel.type = "web";
    Mymodel2.company_t='aapl';
    Mymodel2.company_n='apple';
    Mymodel2.s_price=100;
    Mymodel2.s_change=200;
    Mymodel2.s_perc_c = 800;
    Mymodel2.save()
        .then(savedInstance => {
            console.log("Data inserted successfully:", savedInstance);
            res.status(200).send({"msg": "done here"});
        })
        .catch(err => {
            console.error("Error inserting data:", err);
            res.status(500).send({"error": "An error occurred while saving data"});
        });
});*/
// app.post("/insert/watchlist", jsonParser, async (req, res) => {
//     try {
//         // Find existing document by company name
//         const existingDoc = await MyModel2.findOne({ company_t: "AAPL" });
//         console.log(req.body);
//         res.send('welcome, ' + req.body.ticker);

//         if (existingDoc) {
//             // Update existing document
//             existingDoc.company_t = req.body.ticker;
//             existingDoc.company_n = req.body.name;
//             existingDoc.s_price = req.body.c;
//             existingDoc.s_change = req.body.c;
//             existingDoc.s_perc_c = req.body.dp;

//             // Save the updated document
//             const savedInstance = await existingDoc.save();
//             console.log("Data updated successfully:", savedInstance);
//         } else {
//             // If document doesn't exist, create a new one
//             const newDoc = new MyModel2({
//                 company_t: req.body.ticker,
//                 company_n: req.body.name,
//                 s_price: req.body.c,
//                 s_change: req.body.c,
//                 s_perc_c: req.body.dp
//             });

//             // Save the new document
//             const savedInstance = await newDoc.save();
//             console.log("New data inserted successfully:", savedInstance);
//         }
//     } catch (err) {
//         console.error("Error inserting/updating data:", err);
//         res.status(500).send({ "error": "An error occurred while saving data" });
//     }
// });


app.get("/gd/watchlist", async (req, res) => {
    try {
        const data = await MyModel2.find({});
        //console.log("Data retrieved successfully:", data);
        res.status(200).send(data);
    } catch (err) {
        console.error("Error retrieving data:", err);
        res.status(500).send({"error": "An error occurred while retrieving data"});
    }
});

app.post("/insert/watchlist", jsonParser, async (req, res) => {

    try {
        // Find existing document by company name
        const existingDoc = await MyModel2.findOne({ company_t: "AAPL" });
        console.log(req.body);
        res.send('welcome, ' + req.body.ticker);

     
            // If document doesn't exist, create a new one
            const newDoc = new MyModel2({
                company_t: req.body.ticker,
                company_n: req.body.name,
                s_price: req.body.c,
                s_change: req.body.c,
                s_perc_c: req.body.dp
            });

            // Save the new document
            const savedInstance = await newDoc.save();
            console.log("New data inserted successfully:", savedInstance);
        
    } catch (err) {
        console.error("Error inserting/updating data:", err);
    }
});


app.post("/delete/watchlist", jsonParser, async (req, res) => {
    try {
        // Find and delete the document by company name
        console.log(req.body)

        res.send('welcome, ' + req.body.ticker);
        const deletedDoc = await MyModel2.deleteOne({ company_t: req.body.ticker});

        if (deletedDoc.deletedCount === 1) {
            console.log("Document deleted successfully");
        } else {
            console.log("Document not found for deletion");
        }
    } catch (err) {
        console.error("Error deleting document:", err);
        res.status(500).send({ "error": "An error occurred while deleting the document" });
    }
});





// app.post("/insert/uwallet", jsonParser, async (req, res) => {
//     try {
//         // Find existing document by company name
//         const existingDoc = await MyModel3.findOne({ company_t: "AAPL" });
//         console.log(req.body);
//         res.send('welcome, ' + req.body);

     
//             // If document doesn't exist, create a new one
//             const newDoc = new MyModel2({
//                 company_t: req.body.ticker,
//                 company_n: req.body.name,
//                 s_price: req.body.c,
//                 s_change: req.body.c,
//                 s_perc_c: req.body.dp
//             });

//             // Save the new document
//             const savedInstance = await newDoc.save();
//             console.log("New data inserted successfully:", savedInstance);
        
//     } catch (err) {
//         console.error("Error inserting/updating data:", err);
//     }
// });



// app.get("/delete/watchlist", async (req, res) => {
//     try {
//         // Find and delete the document by company name
//         const deletedDoc = await MyModel2.deleteOne({ company_t: 'aapl' });

//         if (deletedDoc.deletedCount === 1) {
//             console.log("Document deleted successfully");
//             res.status(200).send({ "msg": "Document deleted successfully" });
//         } else {
//             console.log("Document not found for deletion");
//             res.status(404).send({ "error": "Document not found for deletion" });
//         }
//     } catch (err) {
//         console.error("Error deleting document:", err);
//         res.status(500).send({ "error": "An error occurred while deleting the document" });
//     }
// });

//old one
// app.get("/insert/uwallet", (req, res) => {
//     var m3 = new MyModel3();
//     //Mymodel.name = "darsh";
//     //Mymodel.type = "web";
//     m3.w=25000.00;
//     m3.save()
//         .then(savedInstance => {
//             console.log("Data inserted successfully:", savedInstance);
//             res.status(200).send({"msg": "done here"});
//         })
//         .catch(err => {
//             console.error("Error inserting data:", err);
//             res.status(500).send({"error": "An error occurred while saving data"});
//         });
// });

/*
// atlas
const uri = "mongodb+srv://darshpat:pB6fz3sO1L83U8Qe@cluster0.93epfez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

let database;


const MyModel = require("./channel");

async function connect() {
    try {
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        await client.connect();
        database = client.db('check1');
        console.log("Connected to MongoDB Atlas");
    } catch (err) {
        console.error("Error connecting to MongoDB Atlas:", err);
    }
}

connect();

module.exports = {
    getDatabase: () => require("./channel")
};


app.get("/insert", async (req, res) => {
    try {
        const database = await getDatabase();
        const collection = database.collection('channels');
        
        const result = await collection.insertOne({ name: "darsh", type: "web" });
        
        console.log("Data inserted successfully:", result.ops[0]);
        res.status(200).send({ "msg": "done here" });
    } catch (err) {
        console.error("Error inserting data:", err);
        res.status(500).send({ "error": "An error occurred while saving data" });
    }
});

app.get("/gd", async (req, res) => {
    try {
        const database = await getDatabase();
        const collection = database.collection('channels');

        const data = await collection.find({}).toArray();
        
        console.log("Data retrieved successfully:", data);
        res.status(200).send(data);
    } catch (err) {
        console.error("Error retrieving data:", err);
        res.status(500).send({ "error": "An error occurred while retrieving data" });
    }
});
*/

