import mongoose from "mongoose";

const connectMongoDb = async () => {
    try{
       await  mongoose.connect(process.env.MONGODB_URI);
    }catch(err){
        console.log(`We have some error --- ${err}`)        
    }
}

export default connectMongoDb;