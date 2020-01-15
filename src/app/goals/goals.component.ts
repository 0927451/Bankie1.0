import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User, Goal, Username } from '@/_models';
import { AlertService, UserService, AuthenticationService, GoalService } from '@/_services';

@Component({ templateUrl: 'goals.component.html' })
export class GoalsComponent implements OnInit {
    currentUser: User;
    currentUsername: Username;
    goalForm: FormGroup;
    delGoalForm: FormGroup;
    users = [];
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private goalService: GoalService,
        private alertService: AlertService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
        this.currentUsername = this.authenticationService.currentUsernameValue;
    }

    ngOnInit() {
        this.goalForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(6)]],
            amount: ['', [Validators.required]],
            currentAmount: ['', Validators.required]
        });

        this.goalService.getgoals(this.currentUser)
            .pipe(map(goal => {
                localStorage.setItem('Goal', JSON.stringify(goal));
                console.log(goal);
                return goal;
            }))
        
        this.delGoalForm = this.formBuilder.group({
            goalId: ['', [Validators.required]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.goalForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.goalForm.invalid) {
            return;
        }

        this.loading = true;
        this.goalService.creategoal(this.currentUser, this.goalForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Created Goal', true);
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    onDelete(){
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.delGoalForm.invalid) {
            return;
        }

        this.loading = true;
        this.goalService.deletegoal(this.currentUser, this.delGoalForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Deleted Goal', true);
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}