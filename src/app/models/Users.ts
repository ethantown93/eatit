export interface Users {
    id: string;
    address: string;
    city: string;
    dateRegistered: Date;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    isAdmin: boolean;
    state: string;
    zip: string;
    Orders: [{
        dateOrdered: Date;
        mealDescription: string;
        mealPrice: string;
        mealTitle: string;
    }]
}



