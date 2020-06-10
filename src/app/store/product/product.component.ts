import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core'
import {Option, ProductWrapper} from '../types'
import {CartService} from '../cart/cart.service'

@Component({
  selector: '[app-product]',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent {

  constructor(
    private cart: CartService) {
  }

  @Input() product: ProductWrapper
  @Output() activateProduct: EventEmitter<number> = new EventEmitter<number>()

  public activeOption: Option = null

  private static isSmallDisplay(): boolean {
    return window.innerWidth < 600
  }

  activate() {
    this.activateProduct.emit(this.product.getId())
  }

  deactivate() {
    this.activateProduct.emit(null)
  }

  openOptions(option: Option) {
    this.activate()
    this.activeOption = option
  }

  closeOptions() {
    this.activeOption = null
    // On small display product must remain active
    if (!ProductComponent.isSmallDisplay()) {
      this.deactivate()
    }
  }

  addToCart(product: ProductWrapper) {
    this.cart.addItem(product)
    this.deactivate()
  }
}
