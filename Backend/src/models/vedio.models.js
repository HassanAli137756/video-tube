
import mongoose, {Schema} from 'mongoose'

const videoschema = new Schema(
{
    video:
    {
        type: String,
        required: true
    },

    video_publicId:
    {
        type: String,
        required: true
    },

    owner:
    {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    description:
    {
        type: String,
        required: true
    },

    thumbNail:
    {
        type: String,
        required: true
    },

    thumbNail_publicId:
    {
        type: String,
        required: true
    },

    title:
    {
        type: String,
        required: true
    },

    duration:
    {
        type: String,
        required: true
    },

    isPublished:
    {
        type: Boolean,
        default: true
    }
},
{timestamps: true}
)


export const video = mongoose.model("video", videoschema)