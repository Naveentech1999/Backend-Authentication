const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const createUser = require("./models/Userschema")
const empRoutes = require("./routes/router")
const Ejs = require("ejs")
const bodyParser = require("body-parser")
const app = express();
const PORT = process.env.PORT || 5050

app.use(bodyParser.json());
dotEnv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("DB Connected Succesfully...")
})
.catch((error)=>{
    console.log(error)
})


app.get("/",(req,res)=>{
    res.send("Hello World!!")
})

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT} Port...`)
})

app.use("/Userjwt",empRoutes)
