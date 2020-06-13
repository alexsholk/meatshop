import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core'
import {InputType, Option, ProductWrapper} from '../types'
import {CartService} from '../cart/cart.service'

@Component({
  selector: '[app-product]',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent {
  @Input() product: ProductWrapper
  @Output() activateProduct: EventEmitter<number> = new EventEmitter<number>()
  public inputType = InputType
  public activeOption: Option = null
  public getOptionValue = ProductWrapper.getOptionValue

  constructor(
    private cart: CartService) {
  }

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
