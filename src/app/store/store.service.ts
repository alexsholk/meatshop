import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../environments/environment'
import {shareReplay} from 'rxjs/operators'
import {Category} from './types'

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  categories$: Observable<Category[]>

  constructor(
    private httpClient: HttpClient) {
    // Stream init in constructor prevents duplicate api calls
    this.categories$ = this.httpClient.get<Category[]>(`${environment.apiUrl}/categories`).pipe(shareReplay())
  }

  getCategories(): Observable<Category[]> {
    return this.categories$
  }
}
