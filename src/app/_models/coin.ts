import {Deserializable} from './deserializable.model';

export class Coin implements Deserializable{
    coinId: number;
    timestamp: string
    coinType: number

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}



/*    
"coins": [
    {
        "coinId": 215,
        "timestamp": "2019-12-17T10:53:34.331833",
        "coinType": 100
    }
*/