import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

mongoose.connect(
    process.env.PRODUCTION ? process.env.MONGO_URL : process.env.MONGO_URL_LOCAL,
    {
        useNewUrlParser: true,
        useFindAndModify: false
    }
)

const db = mongoose.connection

const handleOpen = () => {
    console.log("Conneted to DB")
}

const handleError = error => {
    console.log("error to db")
}

db.once("open", handleOpen)
db.once("error", handleError)