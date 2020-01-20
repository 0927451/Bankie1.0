import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";

import { User, Coin } from "@/_models";
import { UserService, AuthenticationService, CoinService } from "@/_services";

@Component({ 
  templateUrl: "history.component.html",
})
export class HistoryComponent implements OnInit {
  currentUser: User;
  users = [];

  coinsHistory:Coin[];

  constructor(
    private authenticationService: AuthenticationService,
    private coinService: CoinService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    console.log("test");
    this.coinService.getCoins(this.currentUser).subscribe(data => {
      this.coinsHistory = data;
      console.log(this.coinsHistory);
     });
    }
} 

