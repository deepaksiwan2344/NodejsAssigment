const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const morgan = require('morgan')
const helmet = require("helmet")
const cors = require('cors');
const dotenv = require("dotenv")
dotenv.config()
const { connect } = require("./connection/db");

const User = require ("./Auth/routes/authRoutes")
const newPost = require ("./Post/routes")

app.use(helmet());
app.use(morgan("dev"))
app.use(cors());
app.use(express.json())
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use("/api/auth", User)
app.use("/api/newPost", newPost)
connect()

var PORT  = process.env.PORT || 8000
app.listen(PORT, ()=>{
    console.log(`A node api is running on port: ${PORT}`);
})
