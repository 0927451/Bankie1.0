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

    changeuser(user: User) {
        return this.http.put<any>(`https://${config.apiUrl}/api/User/SetUser/${user.userId}`, 
        {
            "username": user.username,
            "password": user.password,
            "balance": user.balance
        }
        );
    }

    delete(id: number) {
        return this.http.delete(`https://${config.apiUrl}/api/User/DeleteUser/${id}`);
    }
}