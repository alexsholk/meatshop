import {Injectable} from '@angular/core'
import {ProductWrapper} from '../types'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: ProductWrapper[] = []

  constructor() {
    // this.loadCart()
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

  private saveCart() {
    // localStorage.setItem('cart', JSON.stringify(this.items))
  }

  private loadCart() {
    this.items = JSON.parse(localStorage.getItem('cart')) || []
    console.log(this.items)
  }
}
