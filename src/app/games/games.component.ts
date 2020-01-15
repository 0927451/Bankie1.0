import { Component, OnInit } from '@angular/core';
import * as Phaser from 'phaser'
import { LoadScene } from "./src/scenes/LoadScene";
import { MenuScene } from "./src/scenes/MenuScene";
import { PlayScene } from "./src/scenes/PlayScene";


@Component({ selector: 'app-games', templateUrl: 'games.component.html' })

export class GamesComponent implements OnInit {
    game: Phaser.Game;
    config: Phaser.Types.Core.GameConfig;
    

    constructor(
    ) {
        // Details for our canvas
        this.config = {
          width: 800,
          height: 600,
          parent: 'GameContainer',
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
    }
    // Marc stuff
    ngOnInit() {
        this.game = new Phaser.Game(this.config);
    }
}