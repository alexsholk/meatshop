import {Component, ViewEncapsulation} from '@angular/core'
import {CartService} from '../cart.service'
import {ProductWrapper} from '../../types'

@Component({
  selector: 'app-cart-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent {
  public getOptionValue = ProductWrapper.getOptionValue

  constructor(
    public cart: CartService) {
  }
}
