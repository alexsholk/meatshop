import {Component, HostBinding, HostListener, Input, Renderer2, ViewEncapsulation} from '@angular/core'
import {Option, ProductWrapper} from '../types'
import {CartService} from '../cart/cart.service'

@Component({
  selector: '[app-product]',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent {
  @Input() product: ProductWrapper
  @HostBinding('class.active') isActive: boolean
  public isOptionsOpen = false
  public activeOption: Option = null

  constructor(
    private renderer: Renderer2,
    private cart: CartService) {
  }

  @HostListener('window:resize', ['$event.target'])
  onWindowResize(event) {
    if (event.innerWidth >= 600) {
      this.deactivate()
    } else {
      this.isOptionsOpen = false
    }
  }

  activate() {
    this.isActive = true
    this.renderer.addClass(document.body, 'modal-open')
  }

  deactivate() {
    this.isActive = false
    this.renderer.removeClass(document.body, 'modal-open')
  }

  openOptions(option) {
    this.activeOption = option
    this.isOptionsOpen = true
  }

  addToCart(product: ProductWrapper) {
    this.cart.addItem(product)
    this.deactivate()
  }
}
