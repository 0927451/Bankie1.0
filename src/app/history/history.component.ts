import { Component, OnInit } from "@angular/core";
import { first, map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User, Coin, Username } from "@/_models";
import { AlertService, AuthenticationService, CoinService } from "@/_services";


@Component({ 
  templateUrl: "history.component.html",
})
export class HistoryComponent implements OnInit {
  currentUser: User;
  currentUsername: Username;
  delCoinForm:FormGroup;

  users = [];
  coinsHistory:Coin[];

  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private coinService: CoinService,
    private alertService: AlertService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.currentUsername = this.authenticationService.currentUsernameValue;
  }

  ngOnInit() {
    console.log("test");
    this.coinService.getCoins(this.currentUser).subscribe(data => {
      this.coinsHistory = data;
      console.log(this.coinsHistory);
     });

    this.delCoinForm = this.formBuilder.group({
      coinId: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.delCoinForm.controls; }

  onDelete(){
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.delCoinForm.invalid) {
        return;
    }

    this.loading = true;
    this.coinService.deleteCoin(this.currentUser, this.delCoinForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.error(data);
                this.loading = false;
            },
            error => {
              this.alertService.success('Deleted Coin', true);
              this.loading = false;
              location.reload()
            });
}
} 

