import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core'
import {StoreService} from './store.service'
import {StateService} from './state.service'
import {ActivatedRoute, Router} from '@angular/router'
import {combineLatest, Observable} from 'rxjs'
import {Category, Product} from './types'
import {appAnimations} from '../app.animations'

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: appAnimations
})
export class StoreComponent implements OnInit, OnDestroy {
  public products$: Observable<Product[]>

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public store: StoreService,
    public state: StateService) {
  }

  ngOnInit(): void {
    combineLatest([this.store.getCategories(), this.route.params])
      .subscribe(([categories, {slug}]) => {
        const currentCategory = this.determineCurrentCategory(categories, slug)
        if (currentCategory) {
          this.state.setCurrentCategory(currentCategory)
          this.products$ = this.store.getProductsByCategoryId(currentCategory.id)
        } else {
          return this.router.navigateByUrl('p/404')
        }
      })
  }

  private determineCurrentCategory(categories: Category[], slug: string): Category | null {
    if (slug) {
      return categories.find(category => category.data.slug === slug)
    } else if (categories[0]) {
      return categories[0]
    }
  }

  ngOnDestroy(): void {
    this.state.setCurrentCategory(null)
  }
}
