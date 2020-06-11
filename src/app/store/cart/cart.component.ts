import {Component, ViewEncapsulation} from '@angular/core'
import {CartService} from './cart.service'
import {Option, OptionValue} from '../types'

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

  getOptionValue(option: Option): OptionValue | void {
    if (option.value !== undefined && option.value !== null) {
      return option.values[option.value]
    }
  }
}
