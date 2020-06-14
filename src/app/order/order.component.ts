import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core'
import {CartService} from '../store/cart/cart.service'
import {Router} from '@angular/router'
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderComponent implements OnInit, OnDestroy {
  subscription: Subscription

  constructor(
    public cart: CartService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.subscription = this.cart.cartEmptyEvent$.subscribe(() => {
      return this.router.navigateByUrl('/')
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
