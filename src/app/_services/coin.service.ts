import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, Coin , Piggybankvalue } from '@/_models';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class CoinService {
    constructor(private http: HttpClient) { }

    getCoins(user: User): Observable<Coin[]>{
        return this.http.get<Coin[]>(`https://${config.apiUrl}/api/History/GetCoins/${user.userId}`);
    }

    addCoins(user: User, coin: Coin) {
        return this.http.post<any>(`https://${config.apiUrl}/api/History/AddCoins/${user.userId}`,
        {
            "coinType": coin.coinType
        }
        );
    }

    setCoins(user: User, coin: Coin) {
        return this.http.put<any>(`https://${config.apiUrl}/api/History/SetCoin/${user.userId}?coinId=${coin.coinId}`,
        {
            "timestamp": coin.timestamp,
            "coinType": coin.coinType
        }
        );
    }
    
    deleteCoin(user: User, coin: Coin) {
        return this.http.delete<any>(`https://${config.apiUrl}/api/History/DeleteCoin/${user.userId}?coinId=${coin.coinId}`);
    }

    postPiggyValue(user: User, coin: Coin, piggybankvalue: Piggybankvalue) {
        return this.http.post<any>(`https://${config.apiUrl}/api/History/DeleteCoin/${user.userId}?coinId=${coin.coinId}`,
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
