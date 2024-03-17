import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import connectMongoDb from "../../../libs/mongodb";
import User from  '../../../models/user';

export async function GET (req) {
    try {
        const cookieStore = cookies();
        const cookie = cookieStore.get('user');
        const user = JSON.parse(cookie.value);
        const verifyUser = await User.findOne({email: user.email, password: user.password});
        if(verifyUser){
            return NextResponse.json(verifyUser, { status: 200 });
        }else{
            return NextResponse.json('none', { status: 200 });
        }
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};

export async function POST (req) {
    try {
        const cookieStore = cookies();
        const cookie = cookieStore.get('user');
        const user = JSON.parse(cookie.value);
        const verifyUser = await User.findOne({email: user.email, password: user.password});
        if(verifyUser){
            return NextResponse.json(user, { status: 200 });
        }else{
            return NextResponse.json('none', { status: 200 });
        }
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};