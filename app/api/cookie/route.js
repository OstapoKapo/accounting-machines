import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function GET (req) {
    try {
        const cookieStore = cookies();
        const user = cookieStore.get('user')
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};

export async function POST (req) {
    try {
        const cookieStore = cookies();
        const user = cookieStore.get('user');
        if(user === undefined){
            return NextResponse.json('none', { status: 200 });
        }else{
            return NextResponse.json(user, { status: 200 });
        }
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};