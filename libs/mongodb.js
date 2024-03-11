import mongoose from "mongoose";

const connectMongoDb = async () => {
    try{
       await  mongoose.connect(`mongodb+srv://ostapokapo:a67P5M5rQMJrDObc@cluster0.9u5tlxa.mongodb.net/machin_vise`);
    }catch(err){
        console.log(`We have some error --- ${err}`)        
    }
}

export default connectMongoDb;