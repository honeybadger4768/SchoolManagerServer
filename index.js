import express from "express"
import dotenv from "dotenv"
import v1Route from "./routes/v1/index.js";
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/v1", v1Route)
app.use("/images", express.static("public"))


app.get("/", (req, res, next) =>{
    res.send("HELLO WORLD")
})

app.listen(process.env.PORT, () =>{
    console.log(`api running on localhost:${process.env.PORT}`)
})
