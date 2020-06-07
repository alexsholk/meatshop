import {Component, ViewEncapsulation} from '@angular/core'
import {CartService} from '../store/cart/cart.service'
import {StoreService} from '../store/store.service'

@Component({
  selector: '.main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  public isNavActive = false

  constructor(
    public cart: CartService,
    public store: StoreService) {
  }

  toggleNavActive() {
    this.isNavActive = !this.isNavActive
  }

  scrollTo(elementId: string) {
    const el = document.getElementById(elementId)
    el.scrollIntoView({behavior: 'smooth'})
  }
}
