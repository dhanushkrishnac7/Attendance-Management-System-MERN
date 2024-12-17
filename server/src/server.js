const express = require("express")
const  dotenv = require("dotenv").config()
const connectToDatabase = require("./Config/dbConnection")
const errorHandler = require("./Middleware/errorHandler")
const app = express()

app.use(express.json())

app.use("/user",require("./Routes/userRoutes"))

app.use(errorHandler)


const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Api is running on port : ${port}`)
})