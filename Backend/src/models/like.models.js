import mongoose, {Schema} from 'mongoose'

const likeSchema = new Schema(
{
    liker: 
    {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    
    vedio:
    {
        type: Schema.Types.ObjectId,
        ref: "Vedio",
        required: true
    }
}
)


export const Like = mongoose.model("Like", likeSchema)