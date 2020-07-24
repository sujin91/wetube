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
// export const dummyData = [
//     {
//         id: 1,
//         title: "Video 1",
//         description: "This is something I love",
//         views: 24,
//         videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//         creator: {
//           id: 121212,
//           name: "sujin",
//           email: "sujin@dummy.com"
//         }
//     },
//     {
//         id: 2,
//         title: "Video 2",
//         description: "This is something I love",
//         views: 24,
//         videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//         creator: {
//           id: 121212,
//           name: "sujin",
//           email: "sujin@dummy.com"
//         }
//     },
//     {
//         id: 3,
//         title: "Video 3",
//         description: "This is something I love",
//         views: 24,
//         videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//         creator: {
//           id: 121212,
//           name: "sujin",
//           email: "sujin@dummy.com"
//         }
//     },
//     {
//         id: 4,
//         title: "Video 4",
//         description: "This is something I love",
//         views: 24,
//         videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//         creator: {
//           id: 121212,
//           name: "sujin",
//           email: "sujin@dummy.com"
//         }
//     }
// ]
