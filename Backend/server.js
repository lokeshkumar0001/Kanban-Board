const express = require("express")
const dotenv = require('dotenv');
const connectDatabase = require("./database");
const router = express.Router();
const task = require('./routes/taskRoute')
const path = require('path'); 

const app = express();

//parsing the received data
app.use(express.json());
app.use(express.urlencoded({extended:true}));



//config file handling
dotenv.config({path: 'Backend/config/config.env'});

//connecting database
connectDatabase()

//apis
app.use("/api/v1", task);

//serving the frontend
app.use(express.static(path.join(__dirname,"../frontend/build")));

app.get("*", (req,res) =>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})
  

app.listen(process.env.PORT,()=>{
    console.log(`Server running at port:${process.env.PORT}`);
})