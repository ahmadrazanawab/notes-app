import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    number: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default:false
    },
    verificationCode: {
        type: String,
        default:''
    }
},
    {
        timestamps:true
    }
);

const User = mongoose.model("user", userSchema);
export { User };