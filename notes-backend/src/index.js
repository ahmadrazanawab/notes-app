import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import { router } from "./routes/user.router.js";
import { notes } from "./routes/notes.router.js";

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 4002
app.use(express.json());
app.use(cors())

app.use(cookieParser())
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))


app.get('/', (req, res) => {
    return res.send("this is ahmad raza");
});

app.use('/api/user', router);
app.use('/api/notes', notes);


app.listen(port, () => {
    console.log(`server start at http://localhost:${port}`);
});
