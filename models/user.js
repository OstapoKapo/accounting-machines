import mongoose, {Schema} from "mongoose";

const userShcema = new Schema({
    firstName: String,
    secondName: String,
    email: String,
    password: String,
    avatarImg: String,
    description: String,
    cars: [
        {
            name: String,
            year: Number,
            model: String,
            brand: String,
            carImg: String,
            lubricants: {
                lastChnage: Number,
                nextChange: Number
            },
            filter: {
                lastChnage: Number,
                nextChange: Number
            }
        }
    ]
},{ minimize: false });

const User = mongoose.models.users || mongoose.model('users', userShcema);

export default User; 