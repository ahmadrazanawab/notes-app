const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
require("dotenv").config();

connectDB();
const app = express();
const port = process.env.PORT | 4002
app.use(cors());


app.get('/', (req, res) => {
    return res.send("this is ahmad raza");
});


app.listen(port, () => {
    console.log(`server start at http://localhost:${port}`);
});
