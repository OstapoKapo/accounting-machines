import { NextResponse } from "next/server";
import connectMongoDb from "../../../libs/mongodb";
import User from  '../../../models/user';

export async function POST(request) {
    
    try {
        await connectMongoDb();  
        let {newDate, nextDate, _id, user } = await request.json();
        
        let newUser = await User.findOne({ email: user.email, password: user.password }).lean();
        
        
        let newCars = [...newUser.cars]; // Clone the array

        for(let el of newCars){
            if(toString(el._id) === toString(_id)){
                el.filter.nextChange = nextDate;
                el.filter.lastChange = newDate;
            }
        }         
            await User.updateOne(
                { email: user.email, password: user.password },
                {
                        cars: newCars, // Push the new car directly
                }
            );    
        user = await User.findOne({ email: user.email, password: user.password });
    
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};