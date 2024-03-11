import { NextResponse } from "next/server";
import connectMongoDb from "../../../libs/mongodb";
import User from  '../../../models/user';
import initMiddleware from "../../../libs/init-middleware";
import Cors from 'cors';


export async function POST(request) {
    
Cors();
    try {
        await connectMongoDb();  
        const  {data} = await request.json();
        const verify = await User.findOne({email: data.email, password: data.password});
        if(verify){
            return NextResponse.json(verify, { status: 200 });
        }else{
            return NextResponse.json('Isnt correct password or email', { status: 200 });
        } 
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};