import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    //parsedJson: any;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    setUsername(username){
        localStorage.setItem('currentUsername', JSON.stringify(username));
    }

    login(username, password) {
//        return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { "username": username, "password": password })
        
        return this.http.post<any>(`https://${config.apiUrl}/api/User/LoginUser`,
        {
            "username": username,
            "password": password 
        }, {headers: {'Content-Type': 'application/json'}})
            .pipe(map(user => {
                // store user  in local storage to keep user logged in between page refreshes
                // localStorage.setItem('currentUser', JSON.stringify(user));
                //this.parsedJson = JSON.parse(user)
                //console.log(this.parsedJson)
                console.log(user.User)
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}