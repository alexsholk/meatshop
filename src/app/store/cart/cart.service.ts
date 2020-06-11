import {Injectable} from '@angular/core'
import {ProductWrapper} from '../types'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: ProductWrapper[] = []

  constructor() {
    this.loadCart()
  }

  addItem(product: ProductWrapper) {
    this.items.push(product.clone())
    this.saveCart()
  }

  removeItem(index: number) {
    this.items.splice(index, 1)
    this.saveCart()
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
