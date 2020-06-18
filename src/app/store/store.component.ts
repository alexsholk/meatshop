import {Component, EventEmitter, HostListener, OnDestroy, OnInit, Renderer2, ViewEncapsulation} from '@angular/core'
import {StoreService} from './store.service'
import {StateService} from './state.service'
import {ActivatedRoute, Router} from '@angular/router'
import {combineLatest, Observable} from 'rxjs'
import {Category, ProductWrapper} from './types'
import {appAnimations} from '../app.animations'

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: appAnimations
})
export class StoreComponent implements OnInit, OnDestroy {
  public products$: Observable<ProductWrapper[]>
  public activeProductId: number = null
  public closeOptionEvent: EventEmitter<any> = new EventEmitter<any>()

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
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

  activateProduct(id: number) {
    this.activeProductId = id
    if (id) {
      this.renderer.addClass(document.body, 'modal-open')
    } else {
      this.renderer.removeClass(document.body, 'modal-open')
    }
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target) {
    this.closeOptionEvent.emit()
  }
}
