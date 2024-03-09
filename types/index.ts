export interface User {
    firstName?: String,
    secondName?: String,
    email: String,
    password: String,
    avatarImg?: String,
    description?: String,
    cars?: Car[]
}

export interface Car {
            name: String,
            year: Number,
            model: String,
            brand: String,
            carImg: String,
            lubricants: {
                lastChnage: Number,
                nextChange: Number
            },
            filter: {
                lastChnage: Number,
                nextChange: Number
            }
}

