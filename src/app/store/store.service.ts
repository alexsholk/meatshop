import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {HttpClient, HttpParams} from '@angular/common/http'
import {environment} from '../../environments/environment'
import {map, shareReplay} from 'rxjs/operators'
import {Category, Product, ProductWrapper} from './types'

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

  getProductsByCategoryId(categoryId: number): Observable<ProductWrapper[]> {
    const params = new HttpParams().set('category_id', categoryId.toString())
    return this.httpClient.get<Product[]>(`${environment.apiUrl}/products`, {params})
      .pipe(
        map(products => {
          const productWrappers = []
          for (const product of products) {
            productWrappers.push((new ProductWrapper(product)).selectDefault().setDefaultQuantity())
          }
          return productWrappers
        }),
        shareReplay()
      )
  }
}
