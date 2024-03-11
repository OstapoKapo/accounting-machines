import { NextResponse } from "next/server";
import connectMongoDb from "../../../libs/mongodb";
import User from  '../../../models/user';


export async function POST(request) {
    return NextResponse.json('Isnt correct password or email', { status: 200 });
};