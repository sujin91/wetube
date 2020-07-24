import mongoose from "mongoose"

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: 'text is required'
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: mongoose.Schema.Types.String,
        ref: 'User'
    },
    creatorName: {
        type: mongoose.Schema.Types.String,
        ref: 'User',
        required: 'text is required'
    }
})

const model = mongoose.model("Comment", CommentSchema)
export default model