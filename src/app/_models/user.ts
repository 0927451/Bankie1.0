import { Goal } from "./goal";
import { Coin } from "./coin";

export class User {
    userId: string;
    piggyId: string;
    balance: number;
    goals: Goal;
    coins: Coin;    
    username: string;
    password: string;
    token: string;
}

/*
{
    "userId": "2b44927b-6c60-4d6b-b48e-db050b01c8cb",
    "piggyId": "1234",
    "balance": 1,
    "goals": [
      {
        "goalId": 2,
        "name": "racefiets",
        "amount": 500,
        "currentAmount": 30
      }
    ],
    "coins": [
      {
        "coinId": 215,
        "timestamp": "2019-12-17T10:53:34.331833",
        "coinType": 100
      }
    ],
    "score": {
      "catchingScore": 0,
      "countingScore": 0
    }
  }
  */