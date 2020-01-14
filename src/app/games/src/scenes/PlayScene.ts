import { CST } from "../CST";
import { CharacterSprite } from "../CharacterSprite";
import { Sprite } from "../Sprite";
import { DOWN } from "phaser";
import { PreloadingStrategy } from "@angular/router";
import { MenuScene } from "./MenuScene";
import { ConstantPool, createUrlResolverWithoutPackagePrefix } from "@angular/compiler";

export class PlayScene extends Phaser.Scene {
    // Global variables for all the playscene functions
    anna!: Phaser.Physics.Arcade.Sprite;
    keyboard!: { [index: string]: Phaser.Input.Keyboard.Key };
    player!: Phaser.GameObjects.Container;
    pigs!: Phaser.Physics.Arcade.Group;
    life!: number;
    lifeText!: Phaser.GameObjects.Text;
    repeater!: number;
    timer!: number;

    // The key identifier for the scene.
    constructor() {
        super({
            key: CST.SCENES.PLAY,
        });
    }
    // Preloading the images. Preload is the first function to call.
    preload() {
        this.anims.create({
            key: "left",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("anna", {
                start: 9,
                end: 17
            })
        });
        this.anims.create({
            key: "down",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("anna", {
                start: 18,
                end: 26
            })
        });
        this.anims.create({
            key: "up",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("anna", {
                start: 0,
                end: 8
            })
        });
        this.anims.create({
            key: "right",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("anna", {
                start: 27,
                end: 35
            })
        });
        this.load.image("bankie", "src/app/games/dist/assets/sprite/Bankie.png");
        this.load.image("terrain", "src/app/games/dist/assets/image/terrain_atlas.png");
        this.load.image("bankie", "src/app/games/dist/assets/sprite/Bankie.png");

        this.load.tilemapTiledJSON("mappy", "src/app/games/dist/assets/maps/mappy.json");
    }
    create() {
        // Variable declarations
        this.life = 5;
        this.timer = 0;
        this.repeater = 419;
        this.lifeText = this.add.text(600 - 16, 16, 'life: 5', { fontSize: '32px', fill: '#000' });
        // Group is a Phaser array
        this.pigs = this.physics.add.group({});
        // Give our main character Anna some values.
        this.anna = new CharacterSprite(this, 400, 400, "anna", 26).setScale(.9).setCollideWorldBounds(true).setDepth(1);
        // Load in background
        let mappy = this.add.tilemap("mappy");
        let terrain = mappy.addTilesetImage("terrain_atlas", "terrain");

        //layers settings for overlaps.
        let botLayer = mappy.createStaticLayer("bot", [terrain], 0, 0).setDepth(-1);
        let topLayer = mappy.createStaticLayer("top", [terrain], 0, 0).setDepth(0);

        // Loading in a piggie every 2 seconds.
        this.time.addEvent({
            delay: 2000,
            callback: () =>{
                let randomXspawn = Phaser.Math.Between(50, 750);
                this.pigs.create(randomXspawn,10, "bankie").setVelocityY(200).setScale(0.05);
                
            },
            loop:true
        })
        // The logic for Anna to collect pigs.
        this.physics.add.overlap(this.anna, this.pigs, collectPigs, null, this);
        // The function that disables the pig bodies. 
        function collectPigs (anna, pigs)  {
            pigs.disableBody(true, true)
        }

        // The camera resets so that it's on the right position if you're replaying. 
        this.cameras.main.resetFX();

        // Anna is active so the game loop is true
        this.anna.active = true;
        

    }
    // the game loop
    update(time: number, delta: number) {
        if (!this.anna.active == true) {
            return;
          }

        // The logic for spawning piggies quicker over time.
        this.timer += 1;
        if ( this.timer > this.repeater) {
            let randomXspawn = Phaser.Math.Between(50, 750);
            this.pigs.create(randomXspawn,10, "bankie").setVelocityY(200).setScale(0.05);
            this.timer = 0;
            if (this.repeater > 40) {
                this.repeater = this.repeater - 20;
            }
        }
        // Using the cursor keys
        const cursorKeys = this.input.keyboard.createCursorKeys();
        // Logic for Anna walking where and how fast
        if (cursorKeys.up.isDown) {
        this.anna.setVelocityY(-500);
        } else if (cursorKeys.down.isDown) {
        this.anna.setVelocityY(500);
        } else {
        this.anna.setVelocityY(0);
        }
        
        if (cursorKeys.right.isDown) {
        this.anna.setVelocityX(500);
        } else if (cursorKeys.left.isDown) {
        this.anna.setVelocityX(-500);
        } else {
        this.anna.setVelocityX(0);
        }
        if (this.anna.body.velocity.x > 0) { //moving right
            this.anna.play("right", true);
        } else if (this.anna.body.velocity.x < 0) { //moving left
            this.anna.anims.playReverse("left", true);
        } else if (this.anna.body.velocity.y < 0) { //moving up
            this.anna.play("up", true);
        } else if (this.anna.body.velocity.y > 0) { //moving down
            this.anna.play("down", true);
        }

        // If the pigs are off the screen minus one life. 
        let allpigs = this.pigs.getChildren()
        let numPig = allpigs.length;

        for ( let i = 0; i < numPig; i++) {
            const pig: any = allpigs[i];
            //@ts-ignore
            if (allpigs[i].y > 600 ) {
                
                pig.y = 0
                pig.disableBody(true, true)
                //@ts-ignore
                this.life = this.life - 1;
                this.lifeText.setText('life: ' + this.life)

            }
        }
        // If your life is 0 you die.
        if (this.life == 0) {
            this.gameOver()
        }
        
    }
    // Gameover logic with camerashake.
    gameOver() {
        this.anna.active = false;
        this.cameras.main.shake(500);

        this.time.delayedCall(500, function(){
            this.scene.start(CST.SCENES.MENU)
        }, [] ,this);
    }
        
}
