import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  getItemsCount(): number {
    return 3 // todo replace
  }
}
