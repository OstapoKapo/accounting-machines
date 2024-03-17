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
            history: [{
                description: String,
                date: String
            }],
            lubricants: {
                lastChange: String,
                nextChange: String
            },
            filter: {
                lastChange: String,
                nextChange: String
            },
            name: String,
            year: Number,
            model: String,
            brand: String,
            carImg: String,
        }
    ]
},{ minimize: false });

const User = mongoose.models.users || mongoose.model('users', userShcema);

export default User; 