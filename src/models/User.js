import mongoose from "mongoose"
import passportlocalmongoose from "passport-local-mongoose"

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatarUrl: String,
    githubId: Number,
    kakaoId: Number,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'
        }
    ]
})

UserSchema.plugin(passportlocalmongoose, {usernameField: "email"})

const model = mongoose.model("User", UserSchema)

export default model