const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
const cookieParser = require("cookie-parser");
require("dotenv").config();

connectDB();
const app = express();
const port = process.env.PORT | 4002
app.use(express.json());
app.use(cors())
app.use(cookieParser())
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))


app.get('/', (req, res) => {
    return res.send("this is ahmad raza");
});

app.use('/api/user', require('./routes/user.router'));
app.use('/api/notes', require('./routes/notes.router'));


app.listen(port, () => {
    console.log(`server start at http://localhost:${port}`);
});
