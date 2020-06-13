import {Component, ViewEncapsulation} from '@angular/core'
import {CartService} from './cart.service'

@Component({
  selector: '[app-cart]',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CartComponent {
  public isOpen = true

  constructor(
    public cart: CartService) {
  }

  toggleCartView() {
    this.isOpen = !this.isOpen
  }
}
