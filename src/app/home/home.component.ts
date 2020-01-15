import { Component, OnInit } from '@angular/core';
import { User, Username } from '@/_models';
import { AuthenticationService } from '@/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUser: User;
    currentUsername: Username;
    users = [];

    constructor(
        private authenticationService: AuthenticationService,
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
        this.currentUsername = this.authenticationService.currentUsernameValue;
    }

    ngOnInit() {
    }

}