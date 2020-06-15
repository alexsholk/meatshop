import {EventEmitter, Injectable} from '@angular/core'
import {ProductWrapper} from '../types'
import {OrderFormService} from './order-form.service'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../../environments/environment'
import {catchError} from 'rxjs/operators'
import {Observable, throwError} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartEmptyEvent$: EventEmitter<any> = new EventEmitter<any>()
  items: ProductWrapper[] = []

  constructor(
    public orderForm: OrderFormService,
    private httpClient: HttpClient) {
    this.loadCart()
  }

  addItem(product: ProductWrapper) {
    this.items.push(product.clone())
    this.saveCart()
  }

  removeItem(index: number) {
    this.items.splice(index, 1)
    this.saveCart()
    if (this.getItemsCount() === 0) {
      this.cartEmptyEvent$.emit()
    }
  }

  getItems(): ProductWrapper[] {
    return this.items
  }

  getItemsCount(): number {
    return this.items.length
  }

  getItemsCost(): number {
    let cost = 0
    for (const item of this.items) {
      cost += item.getTotalCost()
    }
    return cost
  }

  submit(): Observable<any> {
    return this.httpClient
      .post(`${environment.apiUrl}/orders`, {
        cart: this.serialize(),
        form: this.orderForm.form.value
      })
      .pipe(
        catchError(err => {
          console.log(err)
          return throwError(err)
        })
      )
  }

  clear() {
    this.items = []
    localStorage.removeItem('cart')
    this.cartEmptyEvent$.emit()
  }

  private serialize() {
    const data = []
    for (const item of this.items) {
      data.push(item.serialize())
    }
    return JSON.stringify(data)
  }

  private saveCart() {
    localStorage.setItem('cart', this.serialize())
  }

  private loadCart() {
    try {
      this.items = []
      const data = JSON.parse(localStorage.getItem('cart')) || []
      for (const row of data) {
        this.items.push(ProductWrapper.deserialize(row))
      }
    } catch (e) {
      this.clear()
    }
  }
}
