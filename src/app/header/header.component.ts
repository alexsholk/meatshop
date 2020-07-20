import {Component, ViewEncapsulation} from '@angular/core'
import {CartService} from '../store/cart/cart.service'
import {StoreService} from '../store/store.service'
import {StateService} from '../store/state.service'

@Component({
  selector: '[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  public isNavActive = false

  constructor(
    public cart: CartService,
    public store: StoreService,
    public state: StateService) {
  }

  toggleNavActive() {
    this.isNavActive = !this.isNavActive
  }

  goToBlog() {
    window.open('https://miloveat.ru', '_blank')
  }
}
