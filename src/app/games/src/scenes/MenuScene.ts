import { CST } from "../CST";
export class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MENU
        })
    }
    init() {
    }
    create() { //creating the menu screen

        //create images (z order)

        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.40, CST.IMAGE.LOGO).setDepth(1);

        this.add.image(0, 0, CST.IMAGE.TITLE).setOrigin(0).setDepth(0);

        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, CST.IMAGE.PLAY).setDepth(1).setScale(2.5);

        //create sprites (if using pixel art, remove sharpen)

        let hoverSprite: Phaser.GameObjects.Sprite = this.add.sprite(100, 100, CST.SPRITE.CAT).setDepth(2);
        hoverSprite.setScale(2);
        hoverSprite.setVisible(false);

        //create audio, disable pauseonblur

        this.sound.pauseOnBlur = false;
        //this.sound.play(CST.AUDIO.TITLE, {loop: true})

        //create animation

        this.anims.create({
            key: "walk",
            frameRate: 4,
            repeat: -1, //repeat forever,
            frames: this.anims.generateFrameNumbers(CST.SPRITE.CAT, {
                frames: [0, 1, 2, 3]
            })
        });

        // Cat is not working but alright.
        playButton.setInteractive();

        playButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.play("walk");
            hoverSprite.x = playButton.x - playButton.width - 20;
            hoverSprite.y = playButton.y;

        })

        playButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        })

        // Go to play scene if you press the play button.
        playButton.on("pointerup", () => {
            this.scene.start(CST.SCENES.PLAY);
        })

    }
}