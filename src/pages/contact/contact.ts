import { ElementRef, ViewChild, Component, ViewChildren, QueryList } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TimelineLite, Back, Bounce, Circ } from "gsap";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  @ViewChild('menu') menu: ElementRef;
  @ViewChildren('symbol') items: QueryList<ElementRef>;
  private open = true;
  angle = 45;
  private _refItems: any;
  constructor(public navCtrl: NavController) {

  }

  toggleMenu(event) {
    this.open = !this.open;
    if (this.open) {
      const tl = new TimelineLite();
      tl.to(this._refItems, 0.2, { scale: 1, ease: Back.easeOut.config(4) }, 0.05);
      this._refItems.forEach((item, index) => {
        tl.to(item, 0.7, { rotation: -index * this.angle + "deg", ease: Bounce.easeOut }, 0.35)
      });
    } else {
      const tl = new TimelineLite();
      this._refItems.forEach(item => {
        tl.to(item, 0.3, { rotation: 0, ease: Circ.easeOut }, 0.05);
        tl.to(item, .3, { scale: 0, ease: Back.easeIn }, 0.3);
      });
    }
  }

  menuTapped($event) {
    // $event.currentTarget.id.replace('item-')) -1
    const index = this._refItems.findIndex(element => element.id === $event.currentTarget.id);
    console.log(this.items[index] ? this.items.toArray()[index] : index, $event.currentTarget.id);
  }

  ionViewDidEnter() {
    this._refItems = this.items.toArray().map(element => element.nativeElement);
    this.items.changes.subscribe(changes => console.log(changes));
  }
}
