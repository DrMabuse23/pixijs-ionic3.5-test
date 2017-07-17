import { Application, Texture, extras } from 'pixi.js';
import { ElementRef, ViewChild, Component } from '@angular/core';
import { NavController, Content, Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('pixistart') pixiContainer: ElementRef;
  @ViewChild(Content) content: Content;
  private app: Application;
  private far: extras.TilingSprite;
  private mid: extras.TilingSprite;
  private farTexture = Texture.fromImage("assets/images/bg-far.png");
  private midTexture = Texture.fromImage("assets/images/bg-mid.png");

  constructor(public navCtrl: NavController, public platform: Platform) { }

  ionViewDidEnter() {
    
    console.log(this.pixiContainer);
    const height = 256 + 128;
    const width = 512;
    this.app = new Application(width, height,
      {
        view: this.pixiContainer.nativeElement,
        antialias: false,
        transparent: false,
        resolution: 1,
      }
    );


    this.far = new extras.TilingSprite(this.farTexture);
    this.far.position.x = 0;
    this.far.width = width;
    this.far.height = height;
    this.far.position.y = 0;
    this.app.stage.addChild(this.far);

    this.mid = new extras.TilingSprite(this.midTexture);
    this.mid.position.x = 0;
    this.mid.position.y = 128;
    this.mid.width = width;
    this.mid.height = height;
    this.app.stage.addChild(this.mid);

    this.app.renderer.render(this.app.stage);
    this.app.ticker.add(this.update.bind(this));
  }

  update() {
    this.far.tilePosition.x -= 0.128;
    this.mid.tilePosition.x -= 0.64;
  }
}
