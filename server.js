const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors');
const dotenv = require("dotenv")
dotenv.config()

const User = require ("./Auth/routes/authRoutes")
const newPost = require ("./Post/routes")

app.use(helmet());
app.use(morgan("dev"))
app.use(cors());
app.use(express.json())
app.use("/api/auth", User)
app.use("/api/newPost", newPost)
connect()

var PORT  = process.env.PORT || 8000
app.listen(PORT, ()=>{
    console.log(`A node api is running on port: ${PORT}`);
})
