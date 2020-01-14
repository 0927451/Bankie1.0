import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'usersettings.component.html' })
export class UsersettingsComponent implements OnInit {
    changeForm;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ){}

    ngOnInit() {
        this.changeForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(6)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    // convenience getter for easy access to form fields
    get cU() { return this.changeForm.controls; }


    onSubmitChangeUser() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.changeForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.changeuser(this.changeForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Account changed', true);
                    this.authenticationService.logout();
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

/*    onSubmitDelete() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        this.loading = true;
        this.userService.delete(authenticationService.userid)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Delete Succesful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });        
    }*/
}
