import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User, Username } from '@/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    private currentUsernameSubject: BehaviorSubject<Username>;
    public currentUser: Observable<User>;
    public currentUsername: Observable<Username>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();

        this.currentUsernameSubject = new BehaviorSubject<Username>(JSON.parse(localStorage.getItem('currentUsername')));
        this.currentUsername = this.currentUsernameSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public get currentUsernameValue(): Username {
        return this.currentUsernameSubject.value;
    }

    login(username, password) {
        return this.http.post(`https://${config.apiUrl}/api/User/LoginUser`,
        {
            "username": username,
            "password": password 
        }, {headers: {'Content-Type': 'application/json'}})        
          .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('currentUsername', JSON.stringify(username));
                console.log(user);
                console.log(username);
                //this.currentUserSubject.next(user);
                return [user, username];
            } 
            ));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUsername');
        this.currentUserSubject.next(null);
    }
}