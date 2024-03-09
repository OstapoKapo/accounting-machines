import { NextResponse } from "next/server";
import connectMongoDb from "../../../libs/mongodb";
import User from  '../../../models/user';


export async function POST(request) {
    try {
        await connectMongoDb();  
        const  {data} = await request.json();
        const verify = await User.findOne({email: data.email});
        if(verify){
            return NextResponse.json('You have account with this email', { status: 200 });
        }else{
            const newUser = new User(data);
            const savedUser = await newUser.save()
            return NextResponse.json(savedUser, { status: 200 });
        } 
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};
