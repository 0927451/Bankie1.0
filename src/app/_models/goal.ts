import {Deserializable} from './deserializable.model';

export class Goal implements Deserializable {
    goalId: number;
    name: string;
    amount: number;
    currentamount: number;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}


/*
{
    "goalId": 2,
    "name": "racefiets",
    "amount": 500,
    "currentAmount": 30
}
*/