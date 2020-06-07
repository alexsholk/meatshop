import {Injectable} from '@angular/core'
import {BehaviorSubject} from 'rxjs'
import {Category} from './types'

@Injectable({
  providedIn: 'root'
})
export class StateService {
  currentCategory$: BehaviorSubject<Category> = new BehaviorSubject<Category>(null)

  setCurrentCategory(category: Category) {
    this.currentCategory$.next(category)
  }

  getCurrentCategory(): BehaviorSubject<Category> {
    return this.currentCategory$
  }
}
