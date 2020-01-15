import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { User, Username } from '@/_models';
import { AlertService, UserService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'usersettings.component.html' })
export class UsersettingsComponent implements OnInit {
    currentUser: User;
    currentUsername: Username;
    changeForm: FormGroup;
    users = [];
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ){
        this.currentUser = this.authenticationService.currentUserValue;
        this.currentUsername = this.authenticationService.currentUsernameValue;
    }

    logout() {
        this.authenticationService.logout()
        this.router.navigate(['/login'])
    }

    ngOnInit() {
        this.changeForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(6)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            balance: ['', Validators.required],
            check: [false, Validators.requiredTrue]
        })
    }

    // convenience getter for easy access to form fields
    get f() { return this.changeForm.controls; }


    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.changeForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.changeuser(this.currentUser, this.changeForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Account info change successful', true);
                    this.logout()
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    deleteUser() {
        this.userService.delete(this.currentUser.userId)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Account deletion successful, Ask your bank for a new piggyId', true);
                    this.logout()
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
