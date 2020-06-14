import {EventEmitter, Injectable} from '@angular/core'
import {ProductWrapper} from '../types'
import {OrderFormService} from './order-form.service'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartEmptyEvent$: EventEmitter<any> = new EventEmitter<any>()
  items: ProductWrapper[] = []

  constructor(public orderForm: OrderFormService) {
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

  submit() {
    console.log(this.orderForm.form)
    const formData = {...this.orderForm.form.value}
  }

  private saveCart() {
    const data = []
    for (const item of this.items) {
      data.push(item.serialize())
    }
    localStorage.setItem('cart', JSON.stringify(data))
  }

  private loadCart() {
    try {
      this.items = []
      const data = JSON.parse(localStorage.getItem('cart')) || []
      for (const row of data) {
        this.items.push(ProductWrapper.deserialize(row))
      }
    } catch (e) {
      localStorage.removeItem('cart')
    }
  }
}
