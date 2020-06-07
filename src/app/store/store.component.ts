import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core'
import {StoreService} from './store.service'
import {StateService} from './state.service'
import {ActivatedRoute, Router} from '@angular/router'
import {combineLatest} from 'rxjs'
import {Category} from './types'
import {appAnimations} from '../app.animations'

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: appAnimations
})
export class StoreComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public store: StoreService,
    public state: StateService) {
  }

  ngOnInit(): void {
    combineLatest([this.store.getCategories(), this.route.params])
      .subscribe(([categories, {slug}]) => {
        let currentCategory: Category
        if (slug) {
          currentCategory = categories.find(category => category.data.slug === slug)
          if (!currentCategory) {
            return this.router.navigateByUrl('p/404')
          }
        } else if (categories[0]) {
          currentCategory = categories[0]
        } else {
          return this.router.navigateByUrl('p/404')
        }
        this.state.setCurrentCategory(currentCategory)
      })
  }

  ngOnDestroy(): void {
    this.state.setCurrentCategory(null)
  }
}
