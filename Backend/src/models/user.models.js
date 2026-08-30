
import mongoose, {mongo, Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoosePaginate from 'mongoose-aggregate-paginate-v2'



const userSchema = new  Schema(
{
    userName:
    {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    email:
    {
        type: String,
        required: true,
        unique: true,
    },
    password:
    {
        type: String,
        required: true,
    },
    watchHistory:
    [
        {
            type: Schema.Types.ObjectId,
            ref: 'Vedio'
        }
    ],
    fullName:
    {
        type: String,
        required: true

    },
    avatar:
    {
        type: String,  // url of cloundnary
        required: true
    },
    coverImage:
    {
        type: String,  // url of cloundnary
    },
    refreshToken:
    {
        type: String,
    },
    avatarPublicID:
    {
        type: String
    },
    coverPublicID:
    {
        type: String
    }
}, { timeStamps: true }
)

userSchema.pre('save', async function () // function write as callback don't has 'this'
{

    // isModified will checks if relvent field, like password has any modification or changes
    // because if we are updating any other property like this.email, then without following condition password will encrypt again and again at very time of updation
    if(!this.isModified('password')) return null

    // bcrypt will hashed password with given 10 rounds
    this.password = await bcrypt.hash(this.password, 10)
})


userSchema.methods.isPasswordCorrect = async function(password)
{

    // it will return boolean response
    
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateRefreshToken = async function () 
{
    return await jwt.sign(
    {
        _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

userSchema.methods.generateAccessToken = async function () 
{
    return await jwt.sign(
    {
        _id: this._id,
        email: this.email,
        password: this.password
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}


export const User = mongoose.model('User', userSchema)
