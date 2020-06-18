import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core'
import {InputType, Option, ProductWrapper} from '../types'
import {CartService} from '../cart/cart.service'
import {Subscription} from 'rxjs'

@Component({
  selector: '[app-product]',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent implements OnInit, OnDestroy {
  @Input() product: ProductWrapper
  @Input() closeOptionEvent: EventEmitter<any>
  @Output() activateProduct: EventEmitter<number> = new EventEmitter<number>()

  private subs: Subscription[] = []
  public inputType = InputType
  public activeOption: Option = null
  public getOptionValue = ProductWrapper.getOptionValue

  constructor(
    private cart: CartService) {
  }

  private static isSmallDisplay(): boolean {
    return window.innerWidth < 600
  }

  ngOnInit(): void {
    this.subs.push(
      this.closeOptionEvent
        .subscribe(() => this.closeOptions())
    )
  }

  ngOnDestroy(): void {
    for (const subscription of this.subs) {
      subscription.unsubscribe()
    }
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
