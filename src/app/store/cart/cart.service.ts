import {Injectable} from '@angular/core'
import {ProductWrapper} from '../types'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: ProductWrapper[] = []

  addItem(product: ProductWrapper) {
    this.items.push(product)
  }

  removeItem(index: number) {
    this.items.splice(index, 1)
  }

  getItems(): ProductWrapper[] {
    return this.items
  }

  getItemsCount(): number {
    return this.items.length
  }
}
