import {Component, ViewEncapsulation} from '@angular/core'
import {CartService} from './cart.service'

@Component({
  selector: '.fixed-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CartComponent {

  constructor(
    public cart: CartService) {
  }
}
