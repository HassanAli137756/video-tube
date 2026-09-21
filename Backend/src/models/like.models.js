import mongoose, {Schema} from 'mongoose'

const likeSchema = new Schema(
{
    liker: 
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
}
)


export const Like = mongoose.model("Like", likeSchema)