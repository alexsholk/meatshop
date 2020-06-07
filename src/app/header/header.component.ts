import {Component, ViewEncapsulation} from '@angular/core'
import {CartService} from '../store/cart.service'

@Component({
  selector: '.main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  public isNavActive = false

  constructor(
    public cart: CartService) {
  }

  toggleNavActive() {
    this.isNavActive = !this.isNavActive
  }
}
