export interface User {
    firstName?: String,
    secondName?: String,
    email: String,
    password: String,
    avatarImg?: String,
    description?: String,
    cars: Car[],
}

export interface Car {
    _id?: String,
    history: History[]        
    year: Number,
    model: String,
    brand: String,
    carImg: String,
    lubricants: {
        lastChange: String,
        nextChange: String
    },
    filter: {
        lastChange: String,
        nextChange: String
    }
}

export interface History {
    description: String,
    date: String
}

