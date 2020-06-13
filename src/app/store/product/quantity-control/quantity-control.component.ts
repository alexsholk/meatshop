import {Component, Input, ViewEncapsulation} from '@angular/core'
import {ProductWrapper} from '../../types'
import {interval, Observable, Subscription} from 'rxjs'

@Component({
  selector: '[app-quantity-control]',
  templateUrl: './quantity-control.component.html',
  styleUrls: ['./quantity-control.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuantityControlComponent {
  @Input() public product: ProductWrapper
  @Input() private timerInterval = 160
  private timer$: Observable<number>
  private timerSub: Subscription

  constructor() {
    this.timer$ = interval(this.timerInterval)
  }

  decreaseTimerOn() {
    this.timerOff()
    this.timerSub = this.timer$.subscribe(() => this.product.decreaseQuantity())
  }

  increaseTimerOn() {
    this.timerOff()
    this.timerSub = this.timer$.subscribe(() => this.product.increaseQuantity())
  }

  timerOff() {
    this.timerSub?.unsubscribe()
  }
}
