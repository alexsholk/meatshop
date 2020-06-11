import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core'
import {Option, OptionValue, ProductWrapper} from '../types'
import {CartService} from '../cart/cart.service'
import {interval, Observable, Subscription} from 'rxjs'

@Component({
  selector: '[app-product]',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent implements OnInit {

  constructor(
    private cart: CartService) {
  }

  @Input() product: ProductWrapper
  @Output() activateProduct: EventEmitter<number> = new EventEmitter<number>()
  private timer$: Observable<number>
  private timerSub: Subscription

  public activeOption: Option = null

  private static isSmallDisplay(): boolean {
    return window.innerWidth < 600
  }

  ngOnInit(): void {
    this.timer$ = interval(160)
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

  getOptionValue(option: Option): OptionValue | void {
    if (option.value !== undefined && option.value !== null) {
      return option.values[option.value]
    }
  }

  decreaseTimerOn() {
    this.timerOff()
    this.timerSub = this.timer$.subscribe(() => this.product.decreaseQuantity())
  }

  timerOff() {
    this.timerSub?.unsubscribe()
  }

  increaseTimerOn() {
    this.timerOff()
    this.timerSub = this.timer$.subscribe(() => this.product.increaseQuantity())
  }
}
