import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    register(user: User) {
        return this.http.post<any>(`https://${config.apiUrl}/api/User/CreateUser`, 
        {
            "username": user.username,
            "password": user.password,
            "piggyId": user.piggyId
        }
        );
    }

    changeuser(user: User, user2: User) {
        return this.http.put<any>(`https://${config.apiUrl}/api/User/SetUser/${user.userId}`, 
        {
            "username": user2.username,
            "password": user2.password,
            "balance": user2.balance
        }
        );
    }

    delete(id: string) {
        return this.http.delete(`https://${config.apiUrl}/api/User/DeleteUser/${id}`);
    }
}