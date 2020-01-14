import { CST } from "../CST";
export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOAD
        })
    }
    init() {

    }
    // Preloading all neccesary assets
    loadImages() {
        this.load.setPath("src/app/games/dist/assets/image");

        for (let prop in CST.IMAGE) {
            //@ts-ignore
            this.load.image(CST.IMAGE[prop], CST.IMAGE[prop]);
        }
    }
    loadAudio() {
        this.load.setPath("src/app/games/dist/assets/audio");

        for (let prop in CST.AUDIO) {
            //@ts-ignore
            this.load.audio(CST.AUDIO[prop], CST.AUDIO[prop]);
        }
    }
    loadSprites(frameConfig?: Phaser.Loader.FileTypes.ImageFrameConfig) {
        this.load.setPath("src/app/games/dist/assets/sprite");

        for (let prop in CST.SPRITE) {
            //@ts-ignore
            this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], frameConfig);
        }
    }
    preload() {
        this.load.spritesheet("anna", "src/app/games/dist/assets/sprite/anna.png", {frameHeight: 64, frameWidth: 64});
        //load atlases

        //load image, spritesheet, sound
        this.loadAudio();
        this.loadSprites({
            frameHeight: 32,
            frameWidth: 32
        });
        this.loadImages();

        //create loading bar

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff //white
            }
        })

        this.load.on("progress", (percent: number) => {
            loadingBar.fillRect(this.game.renderer.width / 2, 0, 50, this.game.renderer.height * percent);
        })


        this.load.on("load", (file: Phaser.Loader.File) => {
        })
    }
    create() {

        this.scene.start(CST.SCENES.MENU);
    }
}