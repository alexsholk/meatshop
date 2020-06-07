import {Injectable} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'
import {Observable} from 'rxjs'
import {SimplePage} from './simple-page.type'
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HtmlService {

  constructor(
    private httpClient: HttpClient) {
  }

  getSimplePageBySlug(slug: string): Observable<SimplePage[]> {
    const params = new HttpParams().set('slug', slug)
    return this.httpClient.get<SimplePage[]>(`${environment.apiUrl}/static-pages`, {params})
  }
}
