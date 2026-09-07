import express, { json } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './Config/DB.js';
import routes from './routes/todo.route.js';




const app = express();
app.use(express.json());
dotenv.config();

connectDB();


app.get("/",(req, res)=>{
    res.send("hello mr adityaaa");
})

app.use("/api/todo",routes);


app.listen(5000,()=>{
    console.log("server is running on port 4000")
})