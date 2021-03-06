import mongoose from "mongoose"
import passportlocalmongoose from "passport-local-mongoose"

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatarUrl: String,
    githubId: Number,
    kakaoId: Number
})

UserSchema.plugin(passportlocalmongoose, {usernameField: "email"})

const model = mongoose.model("User", UserSchema)

export default model