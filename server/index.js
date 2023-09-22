// index.js
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors'); //
const app = express();
const mongoose = require('mongoose')
const port = process.env.PORT
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const chatRoutes = require('./routes/router');

const DB = process.env.DATABASE_URL

mongoose.connect(DB).then(()=>{
  // seedData()
  console.log("Database connected")
}).catch((error)=>
  console.log("no connection",error)
);

app.use(bodyParser.json());

// Use the cors middleware to allow cross-origin requests from all origins
app.use(cors());
app.use(chatRoutes);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
