
import mongoose, {Schema} from 'mongoose'


const commentSchema = new Schema(
{
    content:
    {
        type: String,
        required: true
    },

    commenter:
    {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    video:
    {
        type: Schema.Types.ObjectId,
        ref: "video",
        required: true
    }
},
{timestamps: true}
)

export const Comment = mongoose.model("Comment", commentSchema)