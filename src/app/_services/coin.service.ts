import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, Coin , Piggybankvalue } from '@/_models';

@Injectable({ providedIn: 'root' })
export class CoinService {
    constructor(private http: HttpClient) { }

    getcoins(user: User){
        return this.http.get<any>(`https://${config.apiUrl}/api/Goal/GetCoins/${user.userId}`);
    }

    addcoins(user: User, coin: Coin) {
        return this.http.post<any>(`https://${config.apiUrl}/api/Goal/AddCoins/${user.userId}`,
        {
            "coinType": coin.coinType
        }
        );
    }

    setcoins(user: User, coin: Coin) {
        return this.http.put<any>(`https://${config.apiUrl}/api/Goal/SetCoin/${user.userId}?coinId=${coin.coinId}`,
        {
            "timestamp": coin.timestamp,
            "coinType": coin.coinType
        }
        );
    }
    
    deletecoin(user: User, coin: Coin) {
        return this.http.delete<any>(`https://${config.apiUrl}/api/Goal/DeleteCoin/${user.userId}?coinId=${coin.coinId}`);
    }

    postpiggyvalue(user: User, coin: Coin, piggybankvalue: Piggybankvalue) {
        return this.http.post<any>(`https://${config.apiUrl}/api/Goal/DeleteCoin/${user.userId}?coinId=${coin.coinId}`,
        {
            "fiveCentQuantity": piggybankvalue.fiveCentQuantity,
            "tenCentQuantity": piggybankvalue.tenCentQuantity,
            "twentyCentQuantity": piggybankvalue.twentyCentQuantity,
            "fiftyCentQuantityf": piggybankvalue.fiftyCentQuantity,
            "oneEuroQuantity": piggybankvalue.oneEuroQuantity,
            "twoEuroQuantity": piggybankvalue.twoEuroQuantity
        }
        );
    }
}
