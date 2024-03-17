import { NextResponse } from "next/server";
import connectMongoDb from "../../../libs/mongodb";
import User from  '../../../models/user';

export async function POST(request) {
    
    try {
        await connectMongoDb();  
        const { car, userEmail, userPassword } = await request.json();
        
        let user = await User.findOne({ email: userEmail, password: userPassword }).lean();
        
        let newCars = [...user.cars]; // Clone the array
        newCars.push(car);
                 
        if (!user.cars.some(existingCar => existingCar === car)) {
            await User.updateOne(
                { email: userEmail, password: userPassword },
                {
                    $push: {
                        cars: car, // Push the new car directly
                    },
                }
            );
        }
        
        user = await User.findOne({ email: userEmail, password: userPassword });
    
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};