import {Component, OnChanges, SimpleChanges, ViewEncapsulation} from '@angular/core'
import {CartService} from '../store/cart/cart.service'
import {ProductWrapper} from '../store/types'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderComponent {

  constructor(
    public cart: CartService) {
  }
}
