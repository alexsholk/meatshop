import {Component, ViewEncapsulation} from '@angular/core'
import {CartService} from '../../store/cart/cart.service'

@Component({
  selector: '[app-order-form]',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormComponent {

  constructor(
    public cart: CartService) {
  }
}
