import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as Phaser from 'phaser'
import { first } from 'rxjs/operators';
import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';
import { LoadScene } from "./src/scenes/LoadScene";
import { MenuScene } from "./src/scenes/MenuScene";
import { PlayScene } from "./src/scenes/PlayScene";


@Component({ selector: 'app-games', templateUrl: 'games.component.html' })

export class GamesComponent implements OnInit {
    currentUser: User;
    users = [];
    game: Phaser.Game;
    config: Phaser.Types.Core.GameConfig;
    

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
    ) {
        // Details for our canvas
        this.config = {
          width: 800,
          height: 600,
          parent: 'gameContainer',
          scene: [
              LoadScene, MenuScene, PlayScene
          ],
          render: {
              pixelArt: true
          },
          physics: {
              default: "arcade",
              arcade: {
                  debug: false
              }
          },
          scale: {
              mode: Phaser.Scale.FIT,
              autoCenter: Phaser.Scale.CENTER_BOTH
          }
        }
        this.currentUser = this.authenticationService.currentUserValue;
    }
    // Marc stuff
    ngOnInit() {
        this.game = new Phaser.Game(this.config);
    
    }
   
    deleteUser(id: number) {

    }

    private loadAllUsers() {
    }



}