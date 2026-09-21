
import mongoose, {Schema} from 'mongoose'

const vedioSchema = new Schema(
{
    vedio:
    {
        type: String,
        required: true
    },

    vedio_publicId:
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


export const Vedio = mongoose.model("Vedio", vedioSchema)